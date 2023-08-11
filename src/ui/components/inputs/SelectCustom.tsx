/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Select as AntSelect, Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const Select = (props: any) => {
    const { label } = props;
    // const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
    // const [fetching, setFetching] = useState(false);

    // useEffect(() => {
    //     if (value) {
    //         setSelectedValue(value);
    //     } else if (!value && !defaultSelectedValue) {
    //         setSelectedValue(undefined);
    //     }
    // }, [defaultSelectedValue, value]);

    // useEffect(() => {
    //     if (selectedValue) {
    //         onChange?.(selectedValue);
    //     }
    // }, [selectedValue, onChange]);

    // const handleSelectChange = useCallback((selected) => {
    //     setSelectedValue(selected);
    // }, []);

    // const handleSelectSearch = useCallback(
    //     (searchedValue) => {
    //         if (onSearch) {
    //             setFetching(true);
    //             onSearch(searchedValue).then(() => {
    //                 setFetching(false);
    //             });
    //         }
    //     },
    //     [onSearch],
    // );

    const renderedLabel = label && (
        <label className="aic select__label mb-7" htmlFor={props.id}>
            {label}
        </label>
    );

    const renderedErrorTooltip = props.error && !props.disabled && props.bordered && (
        <Tooltip
            className="date-picker__error-tooltip"
            title={props.errorTooltipText}
            placement={props.errorTooltipPlacement}
            overlayInnerStyle={{ fontSize: 14 }}
            color="#ff7875"
        >
            <CloseCircleFilled width={14} height={14} />
        </Tooltip>
    );

    return (
        <div className={props.className}>
            {renderedLabel}
            <div className="aic select__wrap">
                <AntSelect {...props} />
                {renderedErrorTooltip}
            </div>
        </div>
    );
};

export default Select;
