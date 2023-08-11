import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AlertLogo from '../../../../assets/icons/AlertLogo';
import EyeInvisible from '../../../../assets/icons/EyeInvisible';
import Eye from '../../../../assets/icons/Eye';
import COLORS from '../../../foundation/colors';

const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*'];

interface Props {
    placeholder: string;
    name: string;
    onChange: (e: any) => void;
    hasError?: () => boolean;
    showRequirements?: boolean;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export default function InputPassword({
    onChange,
    showRequirements = false,
    placeholder,
    name,
    hasError,
    label,
    disabled,
    className,
}: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [errorCaracter, setErrorCaracter] = useState<boolean>(false);
    const [errorNeedsLowerCase, setErrorNeedsLowerCase] = useState<boolean>(false);
    const [errorNumber, setErrorNumber] = useState<boolean>(false);
    const [errorEspecialCaracter, setErrorEspecialCaracter] = useState<boolean>(false);
    const [errorUpper, setErrorUpper] = useState<boolean>(false);

    const handleInputChange = (e) => {
        onChange(e);
        setValue(e.target.value);
    };

    const validatePassword = (value) => {
        if (value.length < 8) {
            setErrorCaracter(true);
        } else {
            setErrorCaracter(false);
        }
        if (!value.match(/.*[A-Z].*/)) {
            setErrorUpper(true);
        } else {
            setErrorUpper(false);
        }
        if (!value.match(/.*[a-z].*/)) {
            setErrorNeedsLowerCase(true);
        } else {
            setErrorNeedsLowerCase(false);
        }
        if (!value.match(/.*\d.*/)) {
            setErrorNumber(true);
        } else {
            setErrorNumber(false);
        }
        if (!specialCharacters.some((char) => value.includes(char))) {
            setErrorEspecialCaracter(true);
        } else {
            setErrorEspecialCaracter(false);
        }
    };

    const handleSeePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleInputFocus = () => setInputFocus((prevFocus) => !prevFocus);

    useEffect(() => {
        const timer = setTimeout(() => {
            validatePassword(value);
        }, 500);

        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className={className}>
            {label && (
                <label className={`font-medium flex text-sm select-none ${disabled ? 'text-gray-500' : 'text-white'} mb-2`}>{label}</label>
            )}
            <InputContainer className="text-base leading-none w-full" focus={inputFocus} hasError={hasError ? hasError() : false}>
                <Input
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputFocus}
                    type={showPassword ? 'text' : 'password'}
                    className="input-with-out-style w-4/5"
                    placeholder={placeholder}
                    id={name}
                    name={name}
                />
                <Icon className="align-middle float-right m-auto mr-0 pt-0.5 cursor-pointer" onClick={handleSeePassword}>
                    {showPassword ? <Eye width={20} height={20} /> : <EyeInvisible width={20} height={20} />}
                </Icon>
            </InputContainer>
            {showRequirements && (
                <div className="flex flex-col items-start mt-1">
                    <div className="not-italic  font-normal text-sm">Password Requirements</div>

                    <div className="flex mt-1">
                        <div>
                            <div className="flex items-center">
                                <AlertLogo hasPassword={value.length} error={!errorCaracter} width={14} height={14} />
                                <div className="not-italic font-normal text-sm ml-2">8+ Characters</div>
                            </div>
                            <div className="flex items-center mt-1">
                                <AlertLogo hasPassword={value.length} error={!errorNumber} width={14} height={14} />
                                <div className="not-italic font-normal text-sm ml-2">1 number</div>
                            </div>
                            <div className="flex items-center mt-1">
                                <AlertLogo hasPassword={value.length} error={!errorNeedsLowerCase} width={14} height={14} />
                                <div className="not-italic font-normal text-sm ml-2">lower case Letter</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <AlertLogo hasPassword={value.length} error={!errorEspecialCaracter} width={14} height={14} />
                                <div className="not-italic font-normal text-sm ml-2">1 special character</div>
                            </div>
                            <div className="flex items-center mt-1">
                                <AlertLogo hasPassword={value.length} error={!errorUpper} width={14} height={14} />
                                <div className="not-italic font-normal text-sm ml-2">1 upper case Letter</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const InputContainer = styled('div')(
    (props: { focus: boolean; hasError: boolean }) => `
    padding: 11px 16px;
    background: black;
    color: ${COLORS.WHITE};
    border: 1px solid ${COLORS.STROKEGREY};
    border-radius: 8px;
    max-width: 500px;
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    font-variant: tabular-nums;
    font-feature-settings: 'tnum', 'tnum';
    display: inline-block;
    transition: all 0.3s;
    ${
        props.hasError
            ? `
            border: 1px solid ${COLORS.REDERROR};
            `
            : `
            border: 1px solid ${COLORS.STROKEGREY};
        `
    };

    ${props.focus && !props.hasError ? 'box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);' : ''}
    ${props.focus && props.hasError ? 'box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);' : ''}
`,
);

const Input = styled.input`
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

const Icon = styled.i`
    font-size: 20px;
    color: ${COLORS.WHITE};
`;
