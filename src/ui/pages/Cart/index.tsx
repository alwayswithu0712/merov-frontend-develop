import React from 'react';

import { Table, Button } from 'antd';
import useCartContainer from './hooks/useCartContainer';

import MainLayout from '../../layouts/MainLayout';

const Cart = () => {
    const { tableProps } = useCartContainer();
    return (
        <React.Fragment>
            <MainLayout headTitle="Cart" pageClass={'dashboard '}>
                <section className="cart_sections">
                    <div className="aife jcsb cart__header mb-18">
                        <div className="cart__heading">
                            <h1>Cart Page</h1>
                            <span>Lorem text about cart page. Any text</span>
                        </div>
                        <Button type="link" className="btn-custom btn-link-second">
                            Discard Cart
                        </Button>
                    </div>
                    <div className="cart_wrap">
                        <div className="cart_table">
                            <Table
                                className="table-custom"
                                columns={tableProps.columns}
                                dataSource={tableProps.data}
                                pagination={false}
                                scroll={{ x: 900 }}
                                rowKey="id"
                            />
                        </div>
                        <div className="cart_total ">
                            <div>
                                <p className="title">Cart Summary</p>
                                {tableProps?.data?.length ? (
                                    <div className="row_wrap">
                                        {tableProps?.data?.map((prod) => (
                                            <div key={prod.key} className="ajc jcsb row_prod">
                                                <span className="product_name">{prod.name}</span>
                                                <span className="product_price">${Number(prod.quantity) * Number(prod.price)}</span>
                                            </div>
                                        ))}
                                        <div className="ajc jcsb total">
                                            <span className="product_name">Sub Total</span>
                                            <span className="product_price">
                                                $
                                                {tableProps?.data
                                                    ?.map((prod) => Number(prod.quantity) * Number(prod.price))
                                                    .reduce((a, b) => a + b)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <span>No Data</span>
                                )}
                            </div>
                            <Button type="link" className="btn-custom btn-secondary-transparent">
                                Proceed Payment
                            </Button>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    );
};

export default Cart;
