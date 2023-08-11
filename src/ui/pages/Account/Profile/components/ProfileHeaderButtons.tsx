import React, { useState } from 'react';

import { Upload, UploadFile } from 'antd';
import ImgCrop from 'antd-img-crop';
import Router from 'next/router';
import merovService from '../../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../../components/buttons/Button';
import { IUser, useMerovUser } from '../../../../../hooks/useMerovUser';
import useAccountContainer from '../../../../../hooks/useAccountContainer';
import { usePermissionVerifier } from '../../../../../hooks/usePermissionVerifier';

export default function ProfileHeaderButtons() {
    const user = useMerovUser() as IUser;
    const { userData, setUserData } = useAccountContainer(user);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { hasPermissions } = usePermissionVerifier();

    const uploadFile = async (file: any) => {
        if (!hasPermissions()) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        const response = await merovService.secureApi().postImage(formData);

        setUserData({ ...userData, avatarUrl: response.url });
        await merovService.secureApi().updateAccount({ avatarUrl: response.url });
        await user.update();
        setIsLoading(false);
        return '';
    };

    const onPreview = async (file: UploadFile) => {
        if (!hasPermissions()) return;
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader: any = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src as string;
        const imgWindow = window.open(src) as Window;
        imgWindow.document.write(image.outerHTML);
    };

    if (!user.account) {
        return null;
    }

    return (
        <>
            {hasPermissions() && (
                <>
                    <ImgCrop onModalOk={uploadFile} rotate>
                        <Upload className="avatar-uploader" name="avatar" onPreview={onPreview} showUploadList={false}>
                            <Button variant={VARIANT.TERTIARY} size={SIZE.SMALL} className={'mr-3'} loading={isLoading}>
                                Change avatar
                            </Button>
                        </Upload>
                    </ImgCrop>
                </>
            )}

            <Button
                onClick={() => Router.push(`/seller/${userData.account.name}`, undefined)}
                variant={VARIANT.TERTIARY}
                size={SIZE.SMALL}
                loading={isLoading}
            >
                View Public Profile
            </Button>
        </>
    );
}
