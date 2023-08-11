import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectArrow from '../../../../assets/icons/SelectArrow';
import COLORS from '../../../foundation/colors';
import MaterialTooltip from '../../MaterialTooltip';

export interface Option {
    value: any;
    label: any;
    notSelectable?: boolean;
    onClick?: () => void;
}

export interface InputSelectProps {
    label?: string;
    id?: string;
    name?: string;
    options: Option[];
    noOptionLabel?: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (option: Option) => void;
    className?: string;
    defaultValue?: Option;
    style?: any;
    value?: string;
    customValue?: string;
    hasError?: boolean;
    customWeight?: string;
    dontDisableLabel?: boolean;
}

export default function InputSelect({
    id,
    name,
    label,
    value,
    customValue,
    placeholder,
    options,
    noOptionLabel = '',
    onChange,
    disabled,
    defaultValue,
    hasError,
    className,
    customWeight,
    dontDisableLabel,
}: InputSelectProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(defaultValue || null);

    const handleSelectClick = (): void => {
        if (!disabled) setIsOpen((prevState) => !prevState);
    };

    const handleOptionClick = (option: Option): void => {
        setIsOpen(false);
        if (option.onClick) option.onClick();
        if (option.notSelectable) return;
        setSelectedOption(option);
        if (onChange) onChange(option);
    };

    useEffect(() => {
        if (!customValue) {
            if (options.some((option) => option.value === value)) {
                setSelectedOption(options.filter((option) => option.value === value)[0]);
            } else {
                setSelectedOption(null);
            }
        }
    }, [value]);

    useEffect(() => {
        if (customValue) setSelectedOption(options.filter((option) => option.value === customValue)[0]);
    }, [customValue]);

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

            <div className="relative">
                <DropDownHeader
                    id={id}
                    name={name}
                    disabled={disabled}
                    hasError={hasError}
                    customWeight={customWeight}
                    onClick={handleSelectClick}
                >
                    {!selectedOption ? (
                        <PlaceHolder>{placeholder}</PlaceHolder>
                    ) : (
                        <MaterialTooltip tooltipText={selectedOption.label}>
                            <SelectedItem>{selectedOption.label}</SelectedItem>
                        </MaterialTooltip>
                    )}
                    <ImgArrowContainer isOpen={isOpen} disabled={disabled}>
                        <SelectArrow />
                    </ImgArrowContainer>
                </DropDownHeader>
                {isOpen && (
                    <DropDownList className="max-h-48 overflow-y-scroll">
                        {options.length > 0 ? (
                            options.map((option, index) => (
                                <ListItem
                                    onClick={() => handleOptionClick(option)}
                                    key={`${index}-${option.value}`}
                                    customWeight={customWeight}
                                >
                                    {option.label}
                                </ListItem>
                            ))
                        ) : (
                            <ListItem onClick={() => {}} customWeight={customWeight}>
                                {noOptionLabel}
                            </ListItem>
                        )}
                    </DropDownList>
                )}
            </div>
        </div>
    );
}

const PlaceHolder = styled.span`
    color: ${COLORS.LIGHTGREY};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const DropDownHeader = styled.div(
    (props: Pick<InputSelectProps, 'disabled' | 'hasError' | 'customWeight' | 'name' | 'className'>) => `
    display: flex;
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    justify-content: space-between;
    width: 100%;
    color: ${props.disabled ? COLORS.LIGHTGREY : COLORS.WHITE};
    overflow: hidden;
    background-color: ${props.disabled ? COLORS.ALMOSTBLACK : 'black'};

    ${
        props.hasError
            ? `
            border: 1px solid ${COLORS.REDERROR};
            `
            : `
            border: 1px solid ${COLORS.STROKEGREY};
        `
    };
    font-weight: ${props.customWeight || '500'};
    line-height: 22px;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 16px;
`,
);

const ImgArrowContainer = styled.div(
    (props: Pick<InputSelectProps, 'disabled'> & { isOpen: boolean }) => `
    width: 20px;
    heigth: 20px;
    ${props.disabled ? 'opacity: 0.5;' : 'opacity: 1;'}
    ${props.isOpen ? 'transform: rotate(3.142rad);' : 'transform: rotate(0);'}
    `,
);

const DropDownList = styled.ul`
    width: 100%;
    position: absolute;
    z-index: 2;
    padding: 0;
    margin: 0;
    background: black;
    color: ${COLORS.WHITE};
`;

const ListItem = styled.li(
    (props: Pick<InputSelectProps, 'customWeight'>) => `
    cursor: pointer;
    list-style: none;
    padding: 10px 8px;
    font-size: 16px;
    font-weight: ${props.customWeight || '500'};
    background-color: black;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${COLORS.WHITE};

    &:hover {
        background-color: ${COLORS.ALMOSTBLACK};
        color: ${COLORS.GREEN};
    }
`,
);

const SelectedItem = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
