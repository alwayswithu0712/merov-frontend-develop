import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../../foundation/colors';

export interface InputProps {
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    placeholder?: string;
    maxLettersCount?: number;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    onKeyPress?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    className?: string;
    value?: any;
    hasError?: boolean;
    error?: string;
    customWeight?: string;
    dataSardineId?: string;
    dontDisableLabel?: boolean;
}

export default function Textarea({
    label,
    id,
    name,
    disabled,
    dontDisableLabel,
    placeholder = '',
    maxLettersCount = 0,
    onChange,
    onBlur,
    onKeyPress,
    onKeyDown,
    className,
    value = '',
    hasError = false,
    error,
    dataSardineId = '',
    customWeight,
}: InputProps) {
    const [count, setCount] = useState(0);
    return (
        <div className={className}>
            {label && (
                <label
                    className={`font-medium flex text-sm select-none ${
                        disabled && !dontDisableLabel ? 'text-gray-500' : 'text-white'
                    } mb-2`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <InputStyled
                id={id}
                name={name}
                className={`w-full h-full`}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(e) => {
                    if (!!maxLettersCount && e.target.value.length > maxLettersCount) return;
                    setCount(e.target.value.length);
                    if (onChange) onChange(e);
                }}
                onBlur={onBlur}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                value={value}
                hasError={hasError}
                customWeight={customWeight}
                data-sardine-id={dataSardineId}
            />
            {!!maxLettersCount && (
                <div className={`w-full flex ${error ? 'justify-between' : 'justify-end'}`}>
                    {error && <span className="text-red-600">{error}</span>}
                    <span className="text-xs text-gray-500">
                        {count}/{maxLettersCount}
                    </span>
                </div>
            )}
            {!maxLettersCount && error && <span className="text-red-600">{error}</span>}
        </div>
    );
}

const InputStyled = styled.textarea(
    (props: InputProps) => `
    padding: 11px 16px;
    font-size: 16px;
    font-weight: ${props.customWeight || '500'};
    color: ${props.disabled ? COLORS.LIGHTGREY : COLORS.WHITE};
    background-color: ${props.disabled ? COLORS.ALMOSTBLACK : 'black'};
    border-radius: 8px;
    ${
        props.hasError
            ? `
            border: 1px solid ${COLORS.REDERROR};
            `
            : `
            border: 1px solid ${COLORS.STROKEGREY};
        `
    };
    
    ::placeholder{
        color: ${COLORS.LIGHTGREY};
    };
    
    &:focus {
        box-shadow: 0 0 0 1px ${COLORS.GREEN};
    };
    
    &:disabled {
        cursor: not-allowed;
    };
    `,
);
