/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback, useMemo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface IProduct {
    key: string;
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
}

const useCartContainer = () => {
    const [products, setProducts] = useState<IProduct[]>([
        {
            key: '231',
            id: '1',
            name: 'Product 1',
            description: 'Product 1 Description',
            quantity: 32,
            price: 32,
        },
        {
            key: '232',
            id: '2',
            name: 'Product 2',
            description:
                'Product 2 Description. Long Text. Product 2 Description. Long Text. Product 2 Description. Long Text. Product 2 Description. Long Text.',
            quantity: 32,
            price: 32,
        },
        {
            key: '333',
            id: '3',
            name: 'Product 3',
            description: 'Product 3 Description',
            quantity: 32,
            price: 32,
        },
        {
            key: '443',
            id: '4',
            name: 'Product 4',
            description: 'Product 4 Description',
            quantity: 32,
            price: 32,
        },
        {
            key: '531',
            id: '5',
            name: 'Product 5',
            description: 'Product 5 Description',
            quantity: 32,
            price: 32,
        },
        {
            key: '631',
            id: '6',
            name: 'Product 6',
            description: 'Product 6 Description',
            quantity: 32,
            price: 32,
        },
    ]);

    const handleProductDelete = useCallback(
        (idRow: string) => {
            const newProducts = products.filter((item) => item.id.toString() !== idRow.toString());
            setProducts([...newProducts]);
        },
        [products],
    );

    const handleChangeQuantity = useCallback(
        (event, id) => {
            const currentProduct = products.find((product: IProduct) => product.id === id);

            if (currentProduct) {
                if (event === 'plus') {
                    currentProduct.quantity = Number(currentProduct.quantity) + 1;
                }
                if (event === 'minus') {
                    if (Number(currentProduct.quantity) > 1) {
                        currentProduct.quantity = Number(currentProduct.quantity) - 1;
                    } else {
                        currentProduct.quantity = 1;
                    }
                }

                const newProducts = products.map((prod: IProduct) => (prod.id === id ? { ...currentProduct } : prod));

                setProducts([...newProducts]);
            }
        },
        [products],
    );

    const handleChangeQuantityInput = useCallback(
        (e, id) => {
            const { value } = e.target;
            const currentProduct = products.find((product: IProduct) => product.id === id);

            if (currentProduct) {
                if (value !== '-' && value > 0) {
                    currentProduct.quantity = value;
                } else {
                    currentProduct.quantity = 1;
                }

                const newProducts: IProduct[] = products.map((prod) => (prod.id === id ? { ...currentProduct } : prod));

                setProducts([...newProducts]);
            }
        },
        [products],
    );

    const columns = useMemo(
        () => [
            {
                title: 'Product',
                dataIndex: 'name',
                key: 'name',
                width: 300,
                render: (cell: string) => <a className="text-hiden">{cell}</a>,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: 350,
                render: (cell: string) => <span className="text-hiden">{cell}</span>,
            },
            {
                title: 'Quantity',
                key: 'quantity',
                width: 200,
                dataIndex: 'quantity',
                render: (cell: number, row: IProduct) => (
                    <div key={row.key} className="aic jcfs input-wrap">
                        <span onClick={() => handleChangeQuantity('minus', row.id)}>-</span>
                        <Input
                            key={row.key}
                            type="number"
                            onChange={(e) => handleChangeQuantityInput(e, row.id)}
                            className="input-quantity"
                            value={cell}
                        />
                        <span onClick={() => handleChangeQuantity('plus', row.id)}>+</span>
                    </div>
                ),
            },
            {
                title: 'Price',
                key: 'price',
                dataIndex: 'price',
                width: 100,
                render: (cell: number) => <span>${cell}</span>,
            },
            {
                key: 'delete',
                dataIndex: 'delete',
                width: 20,
                render: (cell: string, row: IProduct) => (
                    <span className="btn-delete">
                        <CloseOutlined onClick={() => handleProductDelete(row.id)} size={29} style={{ color: '#47e6b6' }} />
                    </span>
                ),
            },
        ],
        [handleProductDelete, handleChangeQuantity, handleChangeQuantityInput],
    );

    const tableProps = useMemo(
        () => ({
            columns,
            data: products,
        }),
        [columns, products],
    );

    return {
        tableProps,
    };
};

export default useCartContainer;
