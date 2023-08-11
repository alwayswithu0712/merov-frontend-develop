import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import merovService from '../../services/merov';
import isValidImage from '../../helpers/isValidImage';
import { minImageSize } from '../../config/product';

interface UploadPhotoProps {
    imgList: any[];
    setImageList: Function;
    setIsLoadingImage: Function;
    label?: string;
}

interface IPhotoFile {
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;
}

const maxImgCount = 5;

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8, backgroundColor: 'transparent' }}>Upload</div>
    </div>
);

export default function UploadPhoto({ imgList, setImageList, setIsLoadingImage }: UploadPhotoProps) {
    const [photosState, setPhotosState] = useState<IPhotoFile>({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
    });

    const { previewVisible, previewImage, previewTitle } = photosState;

    function getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleCancelPreview = () => {
        setPhotosState((prevState: any) => ({
            ...prevState,
            previewVisible: false,
        }));
    };

    const handlePreview = async (file: any) => {
        const newFile = file;
        if (!newFile.url && !newFile.preview) {
            newFile.preview = await getBase64(newFile.originFileObj);
        }

        setPhotosState((prevState: any) => ({
            ...prevState,
            previewImage: newFile.url || newFile.preview,
            previewVisible: true,
            previewTitle: newFile.name || newFile.url.substring(newFile.url.lastIndexOf('/') + 1),
        }));
    };

    const uploadFile = async (file: any) => {
        const URL = window.URL || window.webkitURL;
        const objectUrl = URL.createObjectURL(file);
        const isValid = await isValidImage(objectUrl);
        if (!isValid) {
            notification.error({
                message: 'Error',
                description: `The size of the image should be more than ${minImageSize}px`,
            });
        } else {
            try {
                setIsLoadingImage(true);
                const formData = new FormData();
                formData.append('image', file);
                const { url } = await merovService.secureApi().postImage(formData);
                setImageList((prevImages) => [url, ...prevImages]);
            } catch (error: any) {
                notification.error({
                    message: 'Error',
                    description: 'File size should be less than 2MB',
                });
            } finally {
                setIsLoadingImage(false);
            }
        }
    };

    const handleImgChange = ({ file }) => {
        if (file) {
            setImageList((prevImages) => [...prevImages.filter((img) => img !== file.url)]);
        }
    };

    return (
        <>
            <Form.Item className="upload-photo-item" wrapperCol={{ span: 24 }}>
                <ImgCrop onModalOk={uploadFile} rotate>
                    <Upload
                        name="photos"
                        accept="image/*"
                        listType="picture-card"
                        onPreview={handlePreview}
                        multiple={true}
                        onChange={handleImgChange}
                        fileList={imgList.map((img, index) => ({ url: img, uid: index.toString(), status: 'done', name: '' }))}
                        isImageUrl={(file) => !!file}
                        maxCount={maxImgCount}
                        withCredentials
                    >
                        {imgList?.length >= maxImgCount ? null : uploadButton}
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                <img alt="" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}
