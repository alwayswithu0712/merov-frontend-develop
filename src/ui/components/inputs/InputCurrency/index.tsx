import React, { useState } from 'react';
import styled from 'styled-components';
import Currency, { Props as CurrencyProps } from '../../Currency';
import COLORS from '../../../foundation/colors';
import { clearInputNumbersWithDecimals } from '../../../../helpers/clearInputNumbers';
import CopyButton from '../../buttons/CopyButton';

export interface InputCurrencyProps {
    label?: string;
    id?: string;
    className?: string;
    name?: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    onKeyPress?: (e: any) => void;
    value?: any;
    currencyData?: CurrencyProps;
    hasError?: boolean;
    addCopyButton?: boolean;
}

interface StyledInputProps {
    focusContainer: boolean;
    hasError: boolean;
    disabled?: boolean;
    addCopyButton: boolean;
    hasCurrency: boolean;
}

export default function InputCurrency({
    currencyData,
    label,
    id,
    name,
    disabled = false,
    placeholder,
    onChange,
    onBlur,
    onKeyPress,
    value,
    hasError = false,
    className = '',
    addCopyButton = false,
}: InputCurrencyProps) {
    const [focusContainer, setFocusContainer] = useState<boolean>(false);

    return (
        <div className={`relative w-full ${className}`}>
            {label && (
                <label className="font-medium flex text-sm select-none text-white mb-2" htmlFor={id}>
                    {label}
                </label>
            )}
            <StyledInputWrap
                hasCurrency={!!currencyData?.currency}
                addCopyButton={addCopyButton}
                disabled={disabled}
                focusContainer={focusContainer}
                hasError={hasError}
            >
                {currencyData && currencyData.currency && (
                    <div className="pl-4">
                        <Currency {...currencyData} showImage></Currency>
                    </div>
                )}
                <input
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={() => setFocusContainer(true)}
                    onBlur={(e) => {
                        setFocusContainer(false);
                        if (onBlur) onBlur(e);
                    }}
                    onKeyPress={onKeyPress}
                    value={value}
                    type="text"
                    onKeyDown={(e) => clearInputNumbersWithDecimals(e, value)}
                    name={name}
                    id={id}
                />
                {currencyData && (
                    <div className="flex pr-2">
                        <Currency {...currencyData} showConversion />
                    </div>
                )}
                {addCopyButton && <CopyButton value={value} />}
            </StyledInputWrap>
        </div>
    );
}

const StyledInputWrap = styled.div(
    (props: StyledInputProps) => `
    overflow: hidden;
    display: flex;
    align-items:center;
    color: #fff;
    font-weight: 400;
    border-radius: 8px;
    width: 100%;
    background-color: ${props.disabled ? COLORS.ALMOSTBLACK : 'black'};
    position: relative;
    justify-content: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 5px;
    &:focus{
        box-shadow: 0 0 0 1px ${COLORS.GREEN};
    };
    ${
        props.hasError
            ? `

            border: 1px solid ${COLORS.REDERROR};
        
            `
            : `
     
            border: 1px solid ${COLORS.STROKEGREY};
        
        `
    };  
    input {
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        font-weight: 500;
        width: 100%;
        background-color: transparent;
        padding: ${props.addCopyButton ? '2px' : '7px'} ${props.hasCurrency ? '8px' : '16px'};

    };
    input::placeholder{
        color: ${COLORS.LIGHTGREY};
    };
    ${
        props.focusContainer
            ? `
        box-shadow: 0 0 0 1px ${COLORS.GREEN};
        `
            : `
        box-shadow: 0px ;
        `
    }
    `,
);
