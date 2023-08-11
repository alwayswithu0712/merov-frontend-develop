/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import useAccountContainer from '../../../../../hooks/useAccountContainer';
import { IUser, useMerovUser } from '../../../../../hooks/useMerovUser';
import Input from '../../../../components/inputs/Input';
import DatePickerCustom from '../../../../components/inputs/DatePickerCustom';
import { InputWidth, Label, SmallerInputsDiv } from '../ProfileComponents.styled';

export default function UserInputs() {
    const user = useMerovUser() as IUser;
    const { userData, tableProps } = useAccountContainer(user);
    return (
        <>
            <SmallerInputsDiv>
                <InputWidth>
                    <Label>First Name</Label>
                    <Form.Item>
                        <Input disabled {...tableProps.firstName} />
                    </Form.Item>
                </InputWidth>
                <InputWidth>
                    <Label>Last Name</Label>
                    <Form.Item>
                        <Input disabled {...tableProps.lastName} />
                    </Form.Item>
                </InputWidth>
            </SmallerInputsDiv>
            <SmallerInputsDiv>
                <InputWidth>
                    <Label>Phone Number</Label>
                    <Form.Item>
                        <Input disabled type="tel" {...tableProps.phone} />
                    </Form.Item>
                </InputWidth>
                <InputWidth>
                    <Label>Email</Label>
                    <Form.Item>
                        <Input disabled {...tableProps.email} />
                    </Form.Item>
                </InputWidth>
            </SmallerInputsDiv>
            <SmallerInputsDiv>
                <InputWidth>
                    <Label>Birthday</Label>
                    <Form.Item>
                        <DatePickerCustom value={moment(userData.dateOfBirth)} disabled className="" />
                    </Form.Item>
                </InputWidth>
            </SmallerInputsDiv>
        </>
    );
}
