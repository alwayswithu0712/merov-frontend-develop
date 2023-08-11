import React from 'react';
import { useFormik } from 'formik';
import Modal from '../../../components/modals/Modal';
import Title from '../../../components/Title';
import Textarea from '../../../components/inputs/Textarea';
import { ButtonProps } from '../../../components/buttons/Button/index';

const validate = (values) => {
    const errors: { disputeReason?: string } = {};

    if (!values.disputeReason) {
        errors.disputeReason = 'Dispute reason is required';
    }
    return errors;
};

interface Props {
    shouldOpen: boolean;
    onCloseModal: () => void;
    onSubmitDispute: (disputeReason: string) => Promise<void>;
    cancelButton: Partial<ButtonProps>;
    acceptButton: Partial<ButtonProps>;
}

export default function DisputeOrderModal({ shouldOpen, onCloseModal, onSubmitDispute, cancelButton, acceptButton }: Props) {
    const formik = useFormik({
        initialValues: {
            disputeReason: '',
        },
        validate,
        onSubmit: (values) => {
            onSubmitDispute(values.disputeReason);
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
                children: 'Ok',
            }}
        >
            <>
                <Title text="Dispute order" className="text-2xl m-0 leading-none" showLeftLine />
                <p className="m-0 mt-4 text-gray-300">
                    Please carefully describe your problem below. You will create a dispute for this order.
                </p>
                <Textarea
                    className="mt-2 mb-3"
                    maxLettersCount={140}
                    placeholder="Describe the reason why you want to dispute this order"
                    value={formik.values.disputeReason}
                    hasError={!!(formik.touched.disputeReason && formik.errors.disputeReason)}
                    error={formik.touched.disputeReason ? formik.errors.disputeReason : ''}
                    onChange={(e) => {
                        formik.setFieldValue('disputeReason', e.target.value);
                    }}
                />
            </>
        </Modal>
    );
}
