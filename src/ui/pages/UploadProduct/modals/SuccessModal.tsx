import { Modal } from 'antd';
import router from 'next/router';
import React from 'react';

import { Product } from '../../../../typings/product';
import Button, { SIZE, VARIANT } from '../../../components/buttons/Button';
import Carousel from '../../../components/Carousel';
import Currency from '../../../components/Currency';

interface SuccessModalProps {
    product: Product;
    setOpenModal: Function;
    openModal: boolean;
}

export default function SuccessModal({ product, setOpenModal, openModal }: SuccessModalProps) {
    const onCloseModal = () => {
        setOpenModal(false);
    };

    const handleViewItem = async () => {
        await router.push(`/products/${product.id}`);
    };
    return (
        <Modal width="800px" visible={openModal} onCancel={onCloseModal} footer={false} style={{ padding: '10px' }}>
            <div className="modal-success-container">
                <div className="row modal-success-border">
                    <h3 className="modal-success-title">Awesome! Your product is now on Merov!</h3>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <Carousel images={product?.images} width={280} height={280} imageLayout="responsive" />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <h3 className="order-product-title">{product?.title}</h3>
                        <h6>Details:</h6>
                        <p className="order-details-info">{product?.description}</p>
                        <div className="order-price-row-center">
                            <h6 style={{ marginRight: '10px' }}>Total: </h6>
                            {product && product.price && product.currency && (
                                <Currency price={product.price} currency={product.currency} showImage showPrice showConversion />
                            )}
                        </div>
                        <h6 style={{ marginTop: '8px' }}>
                            Condition: <span className="order-details-info">{product?.condition}</span>
                        </h6>
                        <h6>
                            Category: <span className="order-details-info">{product?.category.name}</span>
                        </h6>
                        <h6>
                            Subcategory: <span className="order-details-info">{product?.subcategory.name}</span>
                        </h6>
                        <h6>
                            Stock: <span className="order-details-info">{product?.stock}</span>
                        </h6>
                    </div>
                    <div style={{ justifyContent: 'center', display: 'flex' }} className="w-full row">
                        <h6 className="col-12 col-lg-6">
                            * Your product will be under review and will not be available in the Browse section until then.{' '}
                        </h6>
                        <Button
                            variant={VARIANT.PRIMARY}
                            size={SIZE.MEDIUM}
                            onClick={handleViewItem}
                            className="col-12 col-lg-5 col-md-5 ml-1 h-14"
                        >
                            View Item
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
