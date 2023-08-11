import React, { useState } from 'react';
import styled from 'styled-components';
import MinusLogo from '../../../../assets/icons/MinusIcon';
import PlusLogo from '../../../../assets/icons/PlusIcon';
import COLORS from '../../../foundation/colors';

export interface InputQuantityProps {
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    onChange: (value: number) => void;
    onBlur?: (e: any) => void;
    onKeyPress?: (e: any) => void;
    value: number;
    min: number;
    max: number;
    avaliable?: number;
    hasError?: boolean;
    dontDisableLabel?: boolean;
}

interface StyledInputProps {
    focusContainer: boolean;
    hasError: boolean;
    disabled: InputQuantityProps['disabled'];
}

export default function InputQuantity({
    label,
    id,
    name,
    disabled,
    className = '',
    placeholder,
    onChange,
    onBlur,
    onKeyPress,
    value,
    min,
    max,
    avaliable,
    hasError = false,
    dontDisableLabel,
}: InputQuantityProps) {
    const [focusContainer, setFocusContainer] = useState<boolean>(false);

    const handleButtonClick = (sign: 'plus' | 'subtract') => {
        if (disabled) return;
        if (sign === 'plus' && value < max) {
            onChange(value + 1);
        } else if (sign === 'subtract' && value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className={`relative w-full ${className}`}>
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
            <StyledInputWrap focusContainer={focusContainer} hasError={hasError} disabled={disabled}>
                <input
                    id={id}
                    name={name}
                    type="number"
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={(e) => {
                        const regEx = /^\d+$/;
                        if (!regEx.test(e.target.value)) return;
                        const number = +e.target.value;
                        if (number > max || number < min) return;

                        onChange(number);
                    }}
                    onFocus={() => setFocusContainer(true)}
                    onBlur={(e) => {
                        setFocusContainer(false);
                        if (onBlur) onBlur(e);
                    }}
                    onKeyPress={onKeyPress}
                    value={`${value}`}
                    min={min}
                    max={max}
                />
                <div className="flex">
                    <MinusPlusButton
                        showBorders
                        disabled={disabled || value <= min}
                        onClick={() => handleButtonClick('subtract')}
                        role="button"
                    >
                        <MinusLogo width={15} height={15} />
                    </MinusPlusButton>
                    <MinusPlusButton disabled={disabled || value >= max} onClick={() => handleButtonClick('plus')} role="button">
                        <PlusLogo width={15} height={15} />
                    </MinusPlusButton>
                </div>
            </StyledInputWrap>
            {avaliable && (
                <span
                    className={`font-medium flex text-sm ${
                        disabled && !dontDisableLabel ? 'text-gray-500' : 'text-gray-300'
                    } mt-1 select-none`}
                >
                    Available: {avaliable}
                </span>
            )}
        </div>
    );
}

const StyledInputWrap = styled.div(
    (props: StyledInputProps) => `
    overflow: hidden;
    display: flex;
    align-items:center;
    font-weight: 400;
    border-radius: 8px;
    width: 100%;
    background-color: ${props.disabled ? COLORS.ALMOSTBLACK : 'black'};
    position: relative;
    justify-content: flex-start;
    padding:0px;
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
        color: ${props.disabled ? COLORS.LIGHTGREY : COLORS.WHITE};
        font-weight: 500;
        width: 100%;
        background-color: transparent;
        padding: 12px 16px;

    };
    input::placeholder{
        color: ${COLORS.LIGHTGREY};
    };
    input:disabled {
        cursor: not-allowed;
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

const MinusPlusButton = styled.div(
    (props: Pick<InputQuantityProps, 'disabled'> & { showBorders?: boolean }) => `
    cursor: pointer;
    display: flex;
    height: 46px;
    padding: 0 15px;
    ${props.disabled ? 'opacity: 0.4;' : 'opacity: 1;'}
    ${
        props.showBorders
            ? `
        border-right: 1px solid ${COLORS.LIGHTDARK};
        border-left: 1px solid ${COLORS.LIGHTDARK};
        `
            : `
        padding: 0 15px;
        `
    }
    
    svg {
        display: flex;
        margin: auto;
    }

    ${
        !props.disabled &&
        `
        &:hover {
            opacity: 0.8;
        }
        `
    }
`,
);
