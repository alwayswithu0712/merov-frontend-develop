/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { InfoCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';

const CheckboxCustom = ({
    label,

    tooltipText,
    errorTooltipText,
    tooltipPlacement = 'right',
    errorTooltipPlacement = 'left',
    id,
    defaultChecked,
    disabled,
    type,
    checked,
    onChange,
    error,
}: any) => {
    const renderedTooltip = tooltipText && (
        <Tooltip className="ml-5 input__tooltip" title={tooltipText} placement={tooltipPlacement} overlayInnerStyle={{ fontSize: 14 }}>
            <QuestionCircleOutlined width={14} height={14} />
        </Tooltip>
    );

    const renderedLabel = label && (
        <label className="aic input__label mb-7" htmlFor={id}>
            {label}
            {renderedTooltip}
        </label>
    );

    const renderedErrorTooltip = error && !disabled && (
        <Tooltip
            className="input__error-tooltip"
            title={errorTooltipText}
            placement={errorTooltipPlacement}
            overlayInnerStyle={{ fontSize: 14 }}
            color="#ff7875"
        >
            <InfoCircleFilled width={14} height={14} />
        </Tooltip>
    );

    return (
        <>
            {renderedLabel}

            <Checkbox id={id} disabled={disabled} defaultChecked={defaultChecked} checked={checked} onChange={onChange} type={type} />

            {renderedErrorTooltip}
        </>
    );
};

export default CheckboxCustom;
