import React from 'react';
import { DatePicker, Tooltip } from 'antd';
import { InfoCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';

const DatePickerCustom = ({
    label,
    className,
    tooltipText,
    errorTooltipText,
    tooltipPlacement = 'right',
    errorTooltipPlacement = 'left',
    id,
    withClearButton,
    bordered,
    defaultValue,
    disabled,
    value,
    onChange,
    placeholder = 'Placeholder',
    onBlur,
    size,
    error,
    disabledDate,
    dataSardineId = '',
}: any) => {
    const renderedTooltip = tooltipText && (
        <Tooltip className="ml-5 input__tooltip" title={tooltipText} placement={tooltipPlacement} overlayInnerStyle={{ fontSize: 14 }}>
            <QuestionCircleOutlined width={14} height={14} />
        </Tooltip>
    );

    const renderedLabel = label && (
        <label className="aic input__label mb-7" style={{ marginBottom: '5px' }} htmlFor={id}>
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
        <div className={className}>
            {renderedLabel}
            <div className="aic date__pick input__wrap">
                <DatePicker
                    data-sardine-id={dataSardineId}
                    id={id}
                    placeholder={placeholder}
                    allowClear={withClearButton}
                    bordered={bordered}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    size={size}
                    format={'MM-DD-YYYY'}
                    disabledDate={disabledDate}
                    clearIcon={false}
                    className="datepicker_custom"
                    style={{
                        border: '1px solid #1F2123',
                        height: '66px',
                        borderRadius: '4px',
                        width: '100%',
                        // marginTop: '8px',
                        background: '#050505',
                    }}
                />
                {renderedErrorTooltip}
            </div>
        </div>
    );
};

export default DatePickerCustom;
