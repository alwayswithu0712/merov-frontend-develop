import React, { useMemo, useState } from 'react';
import AutoComplete from 'react-google-autocomplete';
import { AutoComplete as AutoCompleteAnt } from 'antd';
import styled from 'styled-components';
import Input from '../../../components/inputs/Input';
import { countries } from '../../../../services/location';
import COLORS from '../../../foundation/colors';

export default function AddressInputs({ tableProps, handleSelectStreet }) {
    const countriesOptions = useMemo(() => countries && countries.map((country) => ({ value: country.name, label: country.name })), []);
    const [optionsCountry, setOptionsCountry] = useState(countriesOptions);

    const country = useMemo(() => countries.find((country) => tableProps.country.value === country.name)?.iso2 || '', [tableProps]);

    const onSearch = (value: string) => {
        setOptionsCountry(
            countriesOptions.filter((country) => country.label.toUpperCase().substring(0, value.length) === value.toUpperCase()),
        );
    };

    return (
        <>
            <div className="rounded-lg w-full my-3">
                <div className=" mt-1">
                    <label className="font-medium flex text-sm select-none text-white mb-2">Country</label>
                    <AutoCompleteAntInputsWraps hasError={tableProps.country?.errors && tableProps.country?.touched}>
                        <AutoCompleteAnt
                            placeholder={'Select a country'}
                            value={tableProps.country.value}
                            options={optionsCountry}
                            className={'ant-autocomplete'}
                            onSearch={onSearch}
                            onSelect={(value: string) => tableProps.country.onChange({ target: { value } })}
                            onChange={(value: string) => tableProps.country.onChange({ target: { value } })}
                        />
                    </AutoCompleteAntInputsWraps>
                    {tableProps.country?.errors && tableProps.country?.touched && (
                        <div className="mt-1">
                            <span className="text-red-600">{tableProps.country?.errors}</span>
                        </div>
                    )}
                </div>
                {tableProps?.country.value ? (
                    <div className=" my-4">
                        <label className="font-medium flex text-sm select-none text-white mb-2">Street address</label>
                        <AutoCompleteInputsWraps hasError={tableProps.street?.errors && tableProps.street?.touched}>
                            <AutoComplete
                                placeholder="Enter your street address"
                                options={{
                                    types: ['address'],
                                    componentRestrictions: { country },
                                }}
                                apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
                                onPlaceSelected={(place: any) => handleSelectStreet(place)}
                                defaultValue={tableProps.street.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => tableProps.street.onChange(e)}
                            />
                        </AutoCompleteInputsWraps>
                        {tableProps.street?.errors && tableProps.street?.touched && (
                            <div className="mt-1">
                                <span className="text-red-600">{tableProps.street?.errors}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    false
                )}
                <Input {...tableProps.city} className="mt-4" />
                {tableProps.city?.errors && tableProps.city?.touched && (
                    <div className="mt-1">
                        <span className="text-red-600">{tableProps.city?.errors}</span>
                    </div>
                )}
                <Input {...tableProps.state} className="mt-4" />
                {tableProps.state?.errors && tableProps.state?.touched && (
                    <div className="mt-1">
                        <span className="text-red-600">{tableProps.state?.errors}</span>
                    </div>
                )}

                <Input {...tableProps.zipcode} className="mt-4" />
                {tableProps.zipcode?.errors && tableProps.zipcode?.touched && (
                    <div className="mt-1">
                        <span className="text-red-600">{tableProps.zipcode?.errors}</span>
                    </div>
                )}
            </div>
        </>
    );
}

const AutoCompleteInputsWraps = styled.div(
    (props: { hasError: boolean }) => `
    align-items:center;
    width: 100%;
    display:flex;
    input{
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        font-weight: 400;
        ${
            props.hasError
                ? `
                border: 1px solid ${COLORS.REDERROR};
                `
                : `
                border: 1px solid ${COLORS.STROKEGREY};
            `
        };
        border-radius: 8px;
        width: 100%;
        background-color:transparent ;
        padding: 12px 16px ;
    }
    input::placeholder{
        color: ${COLORS.LIGHTGREY}!important;
        padding: 12px 0px !important;
    };

    `,
);

const AutoCompleteAntInputsWraps = styled.div(
    (props: { hasError: boolean }) => `
    ${
        props.hasError
            ? `
            border: 1px solid ${COLORS.REDERROR}!important;
            `
            : `
            border: 1px solid ${COLORS.STROKEGREY};
        `
    };
    border-radius: 8px;
    input{
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        font-weight: 400;

    };
    .ant-autocomplete .ant-select-selection-search{
        align-items:center;
        display:flex;
        padding-left:17px;
    };
    .ant-autocomplete .ant-select-selection-placeholder {
        display:flex;
        justify-content:initial;
        color:${COLORS.LIGHTGREY};
        font-weight: 500;
        font-size: 16px;
        padding-left:6px;

    };
    .ant-autocomplete .ant-select-selector {
        background: black ;
        color: #707070 ;
        border: 0px!important;
        height: 48px ;
        text-align: center ;
        padding: 9px ;
        border-radius: 8px ;
    };
    .ant-select {
        border: 0px!important;
    };
    `,
);
