import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../../foundation/colors';
import CopyButton from '../../buttons/CopyButton';

export interface InputCopyProps {
    name?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    valueToCopy: string;
    onChange?: (e: any) => void;
    disabled?: boolean;
    hasError?: boolean;
}

export default function InputCopy({
    onChange,
    placeholder,
    name,
    label,
    disabled = false,
    valueToCopy = '',
    defaultValue = '',
    className = '',
    hasError = false,
}: InputCopyProps) {
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [value, setValue] = useState<string>(defaultValue);

    const handleInputChange = (e: any) => {
        if (onChange) onChange(e);
        setValue(e.target.value);
    };

    const handleInputFocus = () => setInputFocus((prevFocus) => !prevFocus);

    return (
        <div className={className}>
            {label && <label className="font-medium flex text-sm select-none text-white mb-2">{label}</label>}
            <InputContainer disabled={disabled} className={`text-base leading-none w-full`} focus={inputFocus} hasError={hasError}>
                <Input
                    value={value}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputFocus}
                    onKeyDown={(evt) => evt.preventDefault()}
                    type="text"
                    className="input-with-out-style w-4/5"
                    placeholder={placeholder}
                    id={name}
                    name={name}
                />
                <CopyButton value={valueToCopy} />
            </InputContainer>
        </div>
    );
}

const InputContainer = styled('div')(
    (props: { focus: boolean; hasError: boolean; disabled: boolean }) => `
    display: flex;
    flex-wrap: nowrap;
    padding: 5px;
    background-color: ${props.disabled ? COLORS.ALMOSTBLACK : 'black'};
    color: ${COLORS.WHITE};
    border: 1px solid ${COLORS.STROKEGREY};
    border-radius: 8px;

    ${props.focus && !props.hasError ? 'box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);' : ''}
    ${props.focus && props.hasError ? 'box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);' : ''}

    input:disabled {
        cursor: not-allowed;
    };
`,
);

const Input = styled.input`
    cursor: not-allowed;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 6px 10px;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: transparent;
    font-variant: tabular-nums;
    font-feature-settings: 'tnum', 'tnum';

    &:focus {
        outline: none;
    }
`;
