import React, { useState, useCallback } from 'react';
import { Form, notification } from 'antd';
import Router from 'next/router';
import Input from '../../components/inputs/Input';
import UploadPhoto from '../../components/UploadPhoto';
import Button, { SIZE } from '../../components/buttons/Button';
import Title from '../../components/Title';
import merovService from '../../../services/merov';
import StringValidator from '../../../helpers/validators/StringValidator';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';
import { ICreateBlog } from '../../../typings/blog';
import COLORS from '../../foundation/colors';
import Textarea from '../../components/inputs/Textarea';

const initialErrorFields = {
    title: false,
    description: false,
    photo: false,
};

export default function CreateBlog() {
    const [form] = Form.useForm();
    const [blogItem, setBlogItem] = useState<ICreateBlog>();
    const [loading, setLoading] = useState<boolean>(false);
    const { TitleValidator, DescriptionVlidator } = StringValidator();
    const { handleOnFinishFormErrors, handleSetError } = useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);
    const [imgList, setImageList] = useState<any[]>([]);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

    const onFinish = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const blog = await merovService.secureApi().postBlog({ ...blogItem, images: imgList });
            form.resetFields();

            notification.open({
                message: 'Post blog success!',
                className: 'success',
            });
            Router.push(`/blog/${blog.id}`);
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error posting blog item',
                className: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChangeData = useCallback((e, nameField) => {
        setBlogItem((prevItemData) => ({ ...prevItemData, [nameField]: e }));
    }, []);

    const validateImg = () => {
        if (imgList.length > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(`Photo is required!`));
    };

    return (
        <div className="container mb-6">
            <Title text={'Post your blog'} className="mb-8 text-3xl" />
            <div className="flex w-full justify-center m-auto updateForm">
                <Form
                    form={form}
                    className={`w-full p-6 max-w-3xl bg-[${COLORS.LIGHTDARK}]`}
                    name="basic"
                    size="large"
                    onFinish={() => onFinish()}
                    onFinishFailed={handleOnFinishFormErrors}
                    layout="vertical"
                    labelCol={{
                        span: 20,
                    }}
                >
                    <Form.Item
                        name="title"
                        validateTrigger="onChange"
                        rules={[
                            {
                                validator: (e, a) => TitleValidator(a, handleSetError),
                            },
                        ]}
                    >
                        <Input
                            id="title"
                            key="title"
                            label="Title"
                            placeholder="Enter Title"
                            onChange={(e) => handleChangeData(e.target.value, 'title')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        validateTrigger="onChange"
                        className="mt-4 "
                        rules={[
                            {
                                validator: (e, a) => DescriptionVlidator(a),
                            },
                        ]}
                    >
                        <Textarea className={'h-36'} onChange={(e) => handleChangeData(e.target.value, 'description')} />
                    </Form.Item>
                    <div className="row">
                        <div className="w-full mt-4">
                            <Form.Item
                                name="photo"
                                className="h-48"
                                validateTrigger="onChange"
                                rules={[
                                    {
                                        validator: () => validateImg(),
                                    },
                                ]}
                            >
                                <UploadPhoto setIsLoadingImage={setIsLoadingImage} imgList={imgList} setImageList={setImageList} />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <div className="flex mt-8 h-14">
                            <Button disabled={isLoadingImage} size={SIZE.MEDIUM} type="submit" loading={loading}>
                                Post
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
