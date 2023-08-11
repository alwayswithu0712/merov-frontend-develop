import React, { FC } from 'react';
import { Input, Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

export interface Props {
    label?: string;
    sublabel?: string;
    status?: '' | 'warning' | 'error' | undefined;
    className?: string;
    tooltipText?: string;
    errorTooltipText?: string;
    id: string;
    withClearButton?: boolean;
    bordered?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: any) => void;
    onPressEnter?: () => void;
    onBlur?: (e: any) => void;
    placeholder?: string;
    maxLength?: number;
    showCount?: boolean;
    autoSize?:
        | boolean
        | {
              minRows?: number;
              maxRows?: number;
          };
    error?: boolean;
}

const TextareaCustom: FC<Props> = ({
    label = 'Label',
    sublabel,
    errorTooltipText,
    id,
    status,
    withClearButton,
    bordered,
    defaultValue,
    disabled,
    value,
    onChange,
    onPressEnter,
    placeholder,
    maxLength,
    showCount,
    autoSize,
    onBlur,
    error,
}) => {
    const { TextArea: AntTextArea } = Input;

    const renderedSublabel = sublabel && <span className="textarea__label textarea__sublabel ml-4">{sublabel}</span>;

    const renderedLabel = label && (
        <label className="aic textarea__label mb-7" htmlFor={id}>
            {label}
            {renderedSublabel}
        </label>
    );

    const renderedErrorTooltip = error && !disabled && (
        <Tooltip className="textarea__error-tooltip" title={errorTooltipText} overlayInnerStyle={{ fontSize: 14 }} color="#ff7875">
            <CloseCircleFilled width={14} height={14} />
        </Tooltip>
    );

    return (
        <div>
            {renderedLabel}
            <div className="aic textarea__wrap">
                <AntTextArea
                    id={id}
                    placeholder={placeholder}
                    allowClear={withClearButton}
                    bordered={bordered}
                    disabled={disabled}
                    status={status}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    onPressEnter={onPressEnter}
                    maxLength={maxLength}
                    showCount={showCount}
                    autoSize={autoSize}
                    onBlur={onBlur}
                />
                {renderedErrorTooltip}
            </div>
        </div>
    );
};

export default TextareaCustom;
