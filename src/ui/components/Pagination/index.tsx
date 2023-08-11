import React from 'react';

import styled from 'styled-components';
import usePagination from '@mui/material/usePagination';

import { Select } from 'antd';
import COLORS from '../../foundation/colors';
import LeftChevron from '../../../assets/icons/LeftChevron';
import RightChevron from '../../../assets/icons/RightChevron';

type Props = {
    pageCount: number;
    pageSize: number;
    currentPage: number;
    onPaginationChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
};

const Pagination = ({ pageCount, pageSize, currentPage, onPaginationChange, onPageSizeChange }: Props) => {
    const { items } = usePagination({
        count: pageCount,
        page: currentPage,
    });

    const onPageNumberClick = (page: number) => {
        scrollTop();
        onPaginationChange(page);
    };

    const onPageSizeClick = (size: number) => {
        scrollTop();
        onPageSizeChange(size);
    };

    const scrollTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Container>
            <nav>
                <List>
                    {items.map(({ page, type, selected, ...item }, index) => {
                        let children;
                        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                            children = (
                                <button type="button" style={style(selected)} key={`start-${index}`}>
                                    ...
                                </button>
                            );
                        } else if (type === 'page' && page) {
                            children = (
                                <button
                                    type="button"
                                    style={style(selected)}
                                    {...item}
                                    onClick={() => onPageNumberClick(page)}
                                    key={`${page}-${index}`}
                                >
                                    {page}
                                </button>
                            );
                        } else if (type === 'previous' && page) {
                            children = (
                                <button
                                    type="button"
                                    style={style(selected)}
                                    {...item}
                                    onClick={() => onPageNumberClick(page)}
                                    key={`${page}-${index}`}
                                >
                                    <div className="w-min m-auto">
                                        <LeftChevron />
                                    </div>
                                </button>
                            );
                        } else if (type === 'next' && page) {
                            children = (
                                <button
                                    type="button"
                                    style={style(selected)}
                                    {...item}
                                    onClick={() => onPageNumberClick(page)}
                                    key={`${page}-${index}`}
                                >
                                    <div className="w-min m-auto">
                                        <RightChevron />
                                    </div>
                                </button>
                            );
                        }
                        return <li key={index}>{children}</li>;
                    })}
                </List>
            </nav>

            <Select
                style={{ width: '200px', marginLeft: '40px' }}
                className="select_custom_pagination"
                value={pageSize}
                onChange={onPageSizeClick}
            >
                <Select.Option value={12}>12 items per page</Select.Option>
                <Select.Option value={24}>24 items per page</Select.Option>
                <Select.Option value={48}>48 items per page</Select.Option>
            </Select>
        </Container>
    );
};

export default Pagination;

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
});

const style = (selected: boolean) => ({
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: selected ? COLORS.GREEN : COLORS.WHITE,
    borderStyle: 'solid',
    borderRadius: '4px',
    borderWidth: '1px',
    borderColor: selected ? COLORS.GREEN : '#2E2E2E',
    backgroundColor: '#181A1C',
    padding: '2px',
    height: '30px',
    width: '30px',
    marginLeft: '3.75px',
    marginRight: '3.75px',
});

const Container = styled.div`
    display: flex;
    align-items: center;
`;
