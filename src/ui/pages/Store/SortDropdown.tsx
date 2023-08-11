import { DownOutlined } from '@ant-design/icons';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import React, { useState } from 'react';

export default function SortDropdown({ handleChange }) {
    const options = [
        {
            name: 'Price: Low to High',
            value: 'price_asc',
        },
        {
            name: 'Price: High to Low',
            value: 'price_desc',
        },
        {
            name: 'Name (A-Z)',
            value: 'name_asc',
        },
        {
            name: 'Name (Z-A)',
            value: 'name_desc',
        },
    ];

    const [selected, setSelected] = useState<string>(options[0].name);

    function handleClick(item: { name: string; value: string }) {
        setSelected(item.name);
        handleChange(item.value);
    }

    const handleDropdownItems = () =>
        options.map((item, index) => ({
            key: index,
            label: (
                <div key={item.value}>
                    <a className="store-subcategories dropdown-sort" key={index} onClick={() => handleClick(item)}>
                        {item.name}
                    </a>
                </div>
            ),
        }));

    const menu = <Menu items={handleDropdownItems()} className="dropdown-menu-antd dropmenuAllCategories"></Menu>;
    return (
        <React.Fragment>
            <div className=" sortDropMenu col-sm-12 col-md-12 col-lg-11 col-xl-9 display-size ">
                <div className="col-3"> Sort by:</div>
                <Dropdown overlay={menu} className="sortdropToggle col-9">
                    <div className="ant-dropdoswn-link">
                        {selected}
                        <DownOutlined />
                    </div>
                </Dropdown>
            </div>
        </React.Fragment>
    );
}
