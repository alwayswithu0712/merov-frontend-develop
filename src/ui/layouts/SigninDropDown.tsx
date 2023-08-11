import React from 'react';
import { Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Button, { SIZE, VARIANT } from '../components/buttons/Button';

export default function SigninDropdown() {
    const menu = (
        <div className="signin-dropdown-container row">
            <h5 className="header-font-weight">Already a member?</h5>
            <Link href={'/api/auth/login'} passHref>
                <a>
                    <Button variant={VARIANT.PRIMARY} size={SIZE.SMALL} className="col-12">
                        Login
                    </Button>
                </a>
            </Link>
            <div className="header-register-row">
                <div className="header-register-text">Don´t have an account?</div>
                <a className="header-register-register" href={'/signup'}>
                    Register
                </a>
            </div>
        </div>
    );

    return (
        <Dropdown overlay={menu} placement={'bottomRight'} className="profile-dropdown-icon">
            <a className="ant-dropdown-link">
                <div className="aic display-header">Sign In</div>
                <CaretDownOutlined />
            </a>
        </Dropdown>
    );
}
