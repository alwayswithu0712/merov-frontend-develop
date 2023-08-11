import * as React from 'react';
import { AutoComplete } from 'antd';

interface SuggestionsInputCustomProps {
    id?: string;
    disabled?: boolean;
    options: { value: string }[];
    placeholder?: string;
    className?: string;
    onChange: any;
    label?: string;
}

export function SuggestionsInputCustom(props: SuggestionsInputCustomProps) {
    const { label } = props;

    const renderedLabel = label && (
        <label className="aic select__label mb-7" htmlFor={props.id}>
            {label}
        </label>
    );

    return (
        <div className={`custom_autocomplete ${props.className}`}>
            {renderedLabel}
            <div className="aic select__wrap">
                <AutoComplete
                    {...props}
                    style={{ color: 'white' }}
                    filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                />
            </div>
        </div>
    );
}
