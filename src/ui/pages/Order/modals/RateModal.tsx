import React, { useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { Rate } from 'antd';
import Modal from '../../../components/modals/Modal';
import Title from '../../../components/Title';
import Textarea from '../../../components/inputs/Textarea';
import { Account } from '../../../../typings/account';
import UserButton from '../../../components/buttons/UserButton/index';
import { ButtonProps, VARIANT } from '../../../components/buttons/Button';
import COLORS from '../../../foundation/colors';
import { Review } from '../../../../typings/order';

const validate = (values) => {
    const errors: { rating?: string; review?: string } = {};

    if (!values.rating || values.rating === 0) {
        errors.rating = 'Rating is required';
    }

    if (!values.review) {
        errors.review = 'Review is required';
    }
    return errors;
};

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

interface Props {
    account: Account;
    title: string;
    shouldOpen: boolean;
    onCloseModal: () => void;
    onSubmitReview: (values: Review) => Promise<void>;
    cancelButton: Partial<ButtonProps>;
    acceptButton: Partial<ButtonProps>;
}
export default function RateModal({ title, shouldOpen, onCloseModal, onSubmitReview, account, cancelButton, acceptButton }: Props) {
    const [isHoverNumber, setIsHoverNumber] = useState<undefined | number>(undefined);
    const formik = useFormik({
        initialValues: {
            rating: 0,
            review: '',
        },
        validate,
        onSubmit: (values) => {
            onSubmitReview(values as Review);
        },
    });

    return (
        <Modal
            className="w-11/12 md:w-[40rem]"
            shouldOpen={shouldOpen}
            onCloseModal={() => {
                formik.resetForm();
                onCloseModal();
            }}
            cancelButton={{
                loading: cancelButton.loading,
                disabled: cancelButton.disabled,
                children: 'Cancel',
            }}
            acceptButton={{
                loading: acceptButton.loading,
                disabled: acceptButton.disabled,
                onClick: formik.submitForm,
                children: 'Confirm',
            }}
        >
            <>
                <Title text={title} className="text-2xl m-0 leading-none" showLeftLine />
                <div className="w-full flex justify-center my-4">
                    <UserButton
                        href={`/seller/${account.name}`}
                        className={`w-fit`}
                        variant={VARIANT.SECONDARY}
                        account={account}
                        showAvatar
                        showName
                        showStars
                    />
                </div>
                <RateContainer className="w-full flex flex-col justify-center items-center text-2xl">
                    <Rate
                        onHoverChange={setIsHoverNumber}
                        tooltips={desc}
                        onChange={(value) => formik.setFieldValue('rating', value)}
                        value={formik.values.rating}
                    />
                    <span className="mt-4 text-base">{isHoverNumber ? desc[isHoverNumber - 1] : desc[formik.values.rating - 1] || ''}</span>
                </RateContainer>
                {formik.touched.rating && formik.errors.rating && (
                    <span className="w-full text-center text-xs text-red-600">{formik.errors.rating}</span>
                )}
                <Textarea
                    className="mt-4 mb-3"
                    maxLettersCount={140}
                    label="Leave a comment"
                    placeholder="Describe your order experience"
                    value={formik.values.review}
                    hasError={!!(formik.touched.review && formik.errors.review)}
                    error={formik.touched.review && formik.errors.review ? formik.errors.review : ''}
                    onChange={(e) => {
                        formik.setFieldValue('review', e.target.value);
                    }}
                />
            </>
        </Modal>
    );
}

const RateContainer = styled('span')`
    svg {
        width: 28px;
        height: 28px;
    }

    span {
        color: ${COLORS.GREEN};
    }

    .ant-rate-star-full svg path {
        fill: ${COLORS.GREEN};
    }
`;
