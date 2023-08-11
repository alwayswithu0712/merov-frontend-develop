import React from 'react';
import styled from 'styled-components';
import COLORS from '../../../foundation/colors';

export interface InputProps {
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    onKeyPress?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    className?: string;
    value?: any;
    step?: string;
    min?: string;
    max?: string;
    type?: string;
    style?: any;
    hasError?: boolean;
    customWeight?: string;
    dataSardineId?: string;
    dontDisableLabel?: boolean;
}

export default function Input({
    label,
    id,
    name,
    disabled,
    dontDisableLabel,
    placeholder = '',
    onChange,
    onBlur,
    onKeyPress,
    onKeyDown,
    className,
    value = '',
    step,
    min,
    max,
    type,
    style,
    hasError = false,
    dataSardineId = '',
    customWeight,
}: InputProps) {
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
                name={name}
                className="w-full"
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                value={value}
                step={step}
                min={min}
                type={type}
                max={max}
                style={style}
                id={id}
                hasError={hasError}
                customWeight={customWeight}
                data-sardine-id={dataSardineId}
            />
        </div>
    );
}

const InputStyled = styled.input(
    (props: InputProps) => `
    max-height: 48px; 
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
