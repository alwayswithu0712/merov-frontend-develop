import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import PageTitle from '../../layouts/PageTitle';
import TransactionsService from '../../../services/transactions';

export default function Transaction() {
    const limit = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsData, setTransactionsData] = useState<any>({ transactions: [], titles: [] });
    const [transactions, setTransactions] = useState([]);
    const [pages, setPages] = useState<number[]>([]);

    function setCountPages() {
        let count = transactionsData.transactions.length;
        count = Math.ceil(count / limit) + 1;
        // setPages([]);
        for (let i = 1; i < count; i += 1) {
            setPages((prevPages) => [...prevPages, i]);
        }
    }

    useEffect(() => {
        const { getTransactions } = TransactionsService();
        setTransactionsData(getTransactions().data);
        setTransactions(transactionsData.transactions.slice(0, limit));
        setCountPages();
    }, [transactionsData]);

    useEffect(() => {
        const sliceStart = limit * (currentPage - 1);
        setTransactions(transactionsData.transactions.slice(sliceStart, sliceStart + limit));
    }, [currentPage]);

    function handlePrevious() {
        if (pages.includes(currentPage - 1)) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNext() {
        if (pages.includes(currentPage + 1)) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handleNumber(page: number) {
        setCurrentPage(page);
    }

    return (
        <MainLayout headTitle="Transactions" pageClass={'dashboard '} width={'95%'}>
            <PageTitle />
            <div className="row ">
                <div className="cart_table">
                    <Table
                        className="table-custom"
                        columns={transactionsData.titles}
                        dataSource={transactions}
                        pagination={false}
                        scroll={{ x: 900 }}
                        rowKey="id"
                    />
                </div>
            </div>
            <div className="row justify-content-between padding-bottom ">
                <div className="col-3 transactions-d-content">
                    <a className="btn btn-custom btn-primary me-3" onClick={() => handlePrevious()}>
                        Previous
                    </a>
                </div>

                <div className="col-6 transactions-pages">
                    {pages.map((item, index) => (
                        <a key={index} className="transactions-page-nmb" onClick={() => handleNumber(item)}>
                            {item}
                        </a>
                    ))}
                </div>
                <div className="col-3 transactions-d-content">
                    <a className="btn btn-custom btn-primary" onClick={() => handleNext()}>
                        Next
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
