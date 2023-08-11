import React from 'react';
import styled from 'styled-components';
import COLORS from '../../../foundation/colors';
import Spinner from '../../Spinner';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    onMouseLeave?: () => void;
    onMouseEnter ?: () => void;
    disabled?: boolean;
    loading?: boolean | 1 | 0;
    variant?: VARIANT;
    size?: SIZE;
    type?: 'button' | 'submit' | 'reset';
    bold?: boolean;
    className?: string;
    customStyle?: string;
    spinnerSize?: string;
    title?: string;
}

export enum VARIANT {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
    TERTIARY = 'TERTIARY',
    QUATERNARY = 'QUATERNARY',
}

export enum SIZE {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
}

export default function Button({
    children,
    onClick,
    onMouseLeave,
    onMouseEnter ,
    disabled,
    loading,
    className,
    customStyle,
    bold,
    title,
    size = SIZE.MEDIUM,
    variant = VARIANT.PRIMARY,
    type = 'button',
    spinnerSize = '16px',
}: ButtonProps) {
    return (
        <StyledButtton
            type={type}
            variant={variant}
            className={className}
            loading={loading ? 1 : 0}
            disabled={disabled}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            customStyle={customStyle}
            spinnerSize={spinnerSize}
            size={size}
            bold={bold}
            title={title}
        >
            {loading && (
                <Spinner
                    size={spinnerSize}
                    weight="3px"
                    disabled={disabled}
                    color={variant === VARIANT.PRIMARY ? COLORS.GREEN_DARK : COLORS.GREEN}
                />
            )}
            {children}
        </StyledButtton>
    );
}

const StyledButtton = styled('button')(
    (props: ButtonProps) => `
    ${
        props.size === SIZE.MEDIUM
            ? `
        padding: 8px 30px;
        min-width: 120px;
        min-height: 48px;
        font-style: normal;
        font-weight: ${props.bold ? '700' : '600'};
        font-size: 16px;
            `
            : `
        padding: 0px 10px;
        font-style: normal;
        font-weight: ${props.bold ? '700' : '400'};;
        font-size: 14px;
        height: 36px;
        min-height: 36px;
    `
    }
    align-items: center;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    gap: 6px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

    cursor: ${props.loading ? 'wait' : 'pointer'};

    color: ${
        props.variant === VARIANT.PRIMARY
            ? COLORS.GREEN_DARK
            : props.variant === VARIANT.SECONDARY
            ? COLORS.GREEN
            : props.variant === VARIANT.QUATERNARY
            ? COLORS.GREEN
            : COLORS.WHITE
    };
    
    border: ${
        props.variant === VARIANT.PRIMARY
            ? '0px'
            : props.variant === VARIANT.TERTIARY || props.variant === VARIANT.SECONDARY
            ? `1px solid ${COLORS.GREY}`
            : '0px'
    }; 
    
    background-color:${
        props.variant === VARIANT.PRIMARY ? COLORS.GREEN : props.variant === VARIANT.QUATERNARY ? COLORS.BACKGROUNDGREY : 'transparent'
    };

    ${
        !props.loading
            ? `
                &:hover {
                    border: ${
                        props.variant === VARIANT.SECONDARY || props.variant === VARIANT.QUATERNARY
                            ? `1px solid ${COLORS.GREEN}`
                            : props.variant === VARIANT.TERTIARY
                            ? `1px solid ${COLORS.WHITE}`
                            : `0px`
                    }; 
                    background-color:${
                        props.variant === VARIANT.PRIMARY
                            ? COLORS.GREEN_DARK
                            : props.variant === VARIANT.QUATERNARY
                            ? COLORS.BACKGROUNDGREY
                            : 'transparent'
                    };
                    color: ${props.variant === VARIANT.TERTIARY ? COLORS.WHITE : COLORS.GREEN};
                }
            `
            : ''
    }

    &:focus {
        color: ${
            props.variant === VARIANT.PRIMARY
                ? COLORS.GREEN_DARK
                : props.variant === VARIANT.SECONDARY
                ? COLORS.GREEN
                : props.variant === VARIANT.QUATERNARY
                ? COLORS.GREEN
                : COLORS.WHITE
        };
        
        border: ${
            props.variant === VARIANT.PRIMARY
                ? '0px'
                : props.variant === VARIANT.TERTIARY || props.variant === VARIANT.SECONDARY
                ? `1px solid ${COLORS.GREY}`
                : '0px'
        }; 
        
        background-color:${
            props.variant === VARIANT.PRIMARY ? COLORS.GREEN : props.variant === VARIANT.QUATERNARY ? COLORS.BACKGROUNDGREY : 'transparent'
        };
    }
    
    
    &:disabled {
        cursor: not-allowed;
        background-color:${props.variant === VARIANT.PRIMARY || props.variant === VARIANT.QUATERNARY ? COLORS.STROKEGREY : 'transparent'};
        color: ${COLORS.LIGHTGREY};
        border: ${props.variant === VARIANT.SECONDARY || props.variant === VARIANT.TERTIARY ? `1px solid ${COLORS.GREY}` : `0px`}; 
    }
    
    ${
        !props.loading && !props.disabled
            ? `
            &:active {
                color: ${props.variant === VARIANT.TERTIARY ? COLORS.WHITE : COLORS.GREEN};
                border: ${props.variant === VARIANT.TERTIARY ? `1px solid ${COLORS.WHITE}` : `1px solid ${COLORS.GREEN}`}; 
                background-color:${props.variant === VARIANT.PRIMARY ? COLORS.GREEN_DARK : 'transparent'};
                box-shadow: ${
                    props.variant === VARIANT.SECONDARY || props.variant === VARIANT.TERTIARY ? `0 0 6px ${COLORS.GREEN_DARK}` : '0px'
                }
            }`
            : ''
    }

    transition: all 0.15s ease-in-out;
    
    ${props.customStyle ? props.customStyle : ''}
    `,
);
