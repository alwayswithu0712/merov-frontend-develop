import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Subcategory } from '../../../typings/category';

export default function CategoryDropdown({ categories, handleChange }) {
    const [selected, setSelected] = useState('all');

    const handleClick = (filter, name) => {
        handleChange(filter);
        setSelected(name);
    };

    const getDropdownItems = () =>
        categories?.map((category, index) => ({
            key: index,
            label: (
                <div key={category.id} className="dropmenuCategories">
                    <a
                        className="store-categories dropmenuAllCategories"
                        onClick={() => handleClick({ categoryId: category.id, subcategoryId: undefined }, category.name)}
                    >
                        {category.name}
                    </a>
                    {category?.children?.map((subcategory: Subcategory) => (
                        <a
                            onClick={() => handleClick({ categoryId: undefined, subcategoryId: subcategory.id }, subcategory.name)}
                            key={subcategory.id}
                            className="store-subcategories"
                        >
                            {subcategory.name}
                        </a>
                    ))}
                </div>
            ),
        }));

    const menu = <Menu items={getDropdownItems()} className="dropdown-menu-antd dropmenuAllCategories"></Menu>;

    return (
        <div className=" sortDropMenu col-sm-12 col-md-12 col-lg-11 col-xl-9 display-size ">
            <div className="col-3"> Filter by:</div>
            <Dropdown overlay={menu} className="sortdropToggle  col-9">
                <div className="ant-dropdoswn-link">
                    {selected}
                    <DownOutlined />
                </div>
            </Dropdown>
        </div>
    );
}
