import React, { useState } from 'react';
import styled from 'styled-components';
import { IBlog } from '../../../typings/blog';
import MainLayout from '../../layouts/MainLayout';
import Title from '../../components/Title';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../../components/AccountAvatar';
import COLORS from '../../foundation/colors';

interface BlogProps {
    blog: IBlog;
}

const userExamples = {
    name: 'merov',
    avatarUrl: 'http://localhost:3000/images/MerovUser.png',
};

export default function Blog({ blog }: BlogProps) {
    const [imgSelected, setImgSelected] = useState(0);
    const date = new Date(blog.createdAt).toLocaleDateString();

    return (
        <MainLayout headTitle="Blog" pageClass={'dashboard'}>
            <div className="container max-w-screen-xl">
                <div className="product-view">
                    <div className="flex justify-center">
                        <div className="w-full sm:w-8/12">
                            <div className="py-10">
                                <Title text={blog.title} dontShowUnderline className="text-center py-3 text-3xl" />
                                <div className="justify-end flex">
                                    <DateText>{date}</DateText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full sm:w-8/12">
                            <div className="grid md:flex gap-4">
                                <div className="w-full md:w-9/12 aspect-w-1 aspect-h-1 w-full flex-col">
                                    <img
                                        src={blog.images[imgSelected]}
                                        className="h-full w-full object-cover object-center sm:rounded-lg"
                                    />
                                </div>
                                <div className="w-full md:w-2/12 mx-auto mt-6 md:mt-0 max-w-md flex md:block lg:max-w-none">
                                    <div className="w-full flex md:grid gap-6">
                                        {blog.images.map((image, index) => (
                                            <div
                                                key={image}
                                                onClick={() => setImgSelected(index)}
                                                className="w-full max-w-[130px] relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                            >
                                                <>
                                                    <span className="sr-only"> </span>
                                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                                        <img src={image} alt="" className="h-full w-full object-cover object-center" />
                                                    </span>
                                                    <span
                                                        className={`
                                                            ${imgSelected === index ? `ring-[${COLORS.GREEN}]` : 'ring-transparent'}  
                                                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                                                        `}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex py-3 items-center">
                                <AccountAvatar
                                    name={userExamples.name}
                                    avatarUrl={userExamples.avatarUrl}
                                    variant={PROFILE_VARIANT.HORIZONTAL}
                                    href={'#'}
                                    imageSize={50}
                                    showName
                                    animatePhoto
                                />
                            </div>
                            <div className="w-full">
                                <div>
                                    <div className="h-auto md:h-80">
                                        <div className="text-lg font-semibold my-2.5">Description</div>
                                        <div>
                                            <ValueText>{blog.description}</ValueText>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export const ValueText = styled.h6`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin-left: 5px;
`;

export const DateText = styled.h6`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    opacity: 0.5;
    margin: 0px;
`;
