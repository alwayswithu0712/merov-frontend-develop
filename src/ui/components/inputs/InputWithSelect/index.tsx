import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../../foundation/colors';
import Input from '../Input';
import MaterialTooltip from '../../MaterialTooltip';
import SelectArrow from '../../../../assets/icons/SelectArrow';
import { clearInputNumbersWithDecimals } from '../../../../helpers/clearInputNumbers';

export interface InputWithSelectProps {
    id: string;
    name: string;
    className?: string;
    selectValue?: string;
    hasError?: boolean;
    inputProps: any;
    selectOptions: any;
    onChange: (value: string) => void;
    defaultValue: string;
    disabled: boolean;
    placeholder: string;
    customWeight?: string;
    noOptionLabel?: string;
}

export default function InputWithSelect({
    id,
    name,
    selectValue,
    onChange,
    hasError,
    className,
    inputProps,
    selectOptions,
    defaultValue,
    disabled,
    placeholder,
    customWeight,
    noOptionLabel = '',
}: InputWithSelectProps): JSX.Element {
    const [valueSelected, setValueSelected] = useState<string>(defaultValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect(() => {
        if (selectValue) {
            setValueSelected(selectValue);
        }
    }, [selectValue]);

    const handleSelectClick = (): void => {
        if (!disabled) setIsOpen((prevState) => !prevState);
    };

    const handleOptionClick = (option: string): void => {
        setIsOpen(false);
        if (option === '') return;
        setValueSelected(option);
        if (onChange) onChange(option);
    };
    return (
        <div className="relative">
            <Input
                type="number"
                {...inputProps}
                hasError={hasError}
                onKeyDown={(e) => clearInputNumbersWithDecimals(e, inputProps.value)}
            />
            <DropDownHeader
                id={id}
                name={name}
                customWeight={customWeight}
                disabled={disabled}
                hasError={hasError}
                onClick={handleSelectClick}
                className={className}
            >
                {!valueSelected ? (
                    <PlaceHolder>{placeholder}</PlaceHolder>
                ) : (
                    <MaterialTooltip tooltipText={valueSelected}>
                        <SelectedItem>{valueSelected}</SelectedItem>
                    </MaterialTooltip>
                )}
                <ImgArrowContainer isOpen={isOpen} disabled={disabled}>
                    <SelectArrow />
                </ImgArrowContainer>
            </DropDownHeader>
            {isOpen && (
                <DropDownList className="max-h-48 overflow-y-scroll">
                    {selectOptions.length > 0 ? (
                        selectOptions.map((option, index) => (
                            <ListItem onClick={() => handleOptionClick(option)} key={`${index}-${option}`} customWeight={customWeight}>
                                {option}
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
    );
}

const PlaceHolder = styled.span`
    color: ${COLORS.LIGHTGREY};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const DropDownHeader = styled.div(
    (props: Pick<InputWithSelectProps, 'disabled' | 'hasError' | 'customWeight' | 'name' | 'className'>) => `
    position:absolute;
    bottom:0px;
    right:0px;

    display: flex;
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    align-items:center;
    color: ${props.disabled ? COLORS.LIGHTGREY : COLORS.WHITE};
    justify-content:end;
    font-weight: ${props.customWeight || '500'};
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 16px;
`,
);

const ImgArrowContainer = styled.div(
    (props: Pick<InputWithSelectProps, 'disabled'> & { isOpen: boolean }) => `
    width: 20px;
    heigth: 20px;
    ${props.disabled ? 'opacity: 0.5;' : 'opacity: 1;'}
    ${props.isOpen ? 'transform: rotate(3.142rad);' : 'transform: rotate(0);'}
    `,
);

const DropDownList = styled.ul`
    position: absolute;
    widith: auto;
    right: 0px;
    z-index: 2;
    padding: 5px;
    margin: 0;
    background: black;
    color: ${COLORS.WHITE};
`;

const ListItem = styled.li(
    (props: Pick<InputWithSelectProps, 'customWeight'>) => `
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
