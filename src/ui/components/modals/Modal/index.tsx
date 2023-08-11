import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button, { SIZE, VARIANT, ButtonProps } from '../../buttons/Button';
import COLORS from '../../../foundation/colors';

interface Props {
    children: React.ReactNode;
    cancelButton?: ButtonProps;
    acceptButton?: ButtonProps;
    shouldOpen: boolean;
    onCloseModal?: () => void;
    className?: string;
    customStyle?: string;
}

export default function Modal({ shouldOpen, onCloseModal, children, cancelButton, acceptButton, className = '', customStyle = '' }: Props) {
    const [internalClose, setInternalClose] = useState<boolean>(false);

    useEffect(() => {
        let timer;
        if (!shouldOpen) {
            timer = setTimeout(() => {
                setInternalClose(false);
            }, 500);
        } else {
            setInternalClose(true);
        }
        return () => clearTimeout(timer);
    }, [shouldOpen]);

    return internalClose ? (
        <StyledModalContainer
            className={`overflow-auto animate__animated ${shouldOpen ? 'animate__fadeIn' : 'animate__fadeOut'} animate__faster`}
        >
            <StyledModalBody
                className={`flex flex-col m-auto p-4 animate__animated ${
                    shouldOpen ? 'animate__zoomIn' : 'animate__zoomOut'
                }  animate__faster ${className}`}
                customStyle={customStyle}
            >
                {children}
                <div className="flex gap-4">
                    {cancelButton && (
                        <Button
                            loading={cancelButton.loading}
                            disabled={cancelButton.disabled}
                            onClick={() => {
                                if (onCloseModal) onCloseModal();
                                if (cancelButton.onClick) cancelButton.onClick();
                            }}
                            className="w-full"
                            variant={VARIANT.TERTIARY}
                            size={SIZE.SMALL}
                            bold
                        >
                            {cancelButton.children}
                        </Button>
                    )}
                    {acceptButton && (
                        <Button
                            loading={acceptButton.loading}
                            disabled={acceptButton.disabled}
                            onClick={() => {
                                if (acceptButton.onClick) acceptButton.onClick();
                            }}
                            className="w-full"
                            variant={VARIANT.PRIMARY}
                            size={SIZE.SMALL}
                            bold
                        >
                            {acceptButton.children}
                        </Button>
                    )}
                </div>
            </StyledModalBody>
        </StyledModalContainer>
    ) : (
        <></>
    );
}

const StyledModalContainer = styled('section')`
    display: flex;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
`;

const StyledModalBody = styled('div')(
    (props: Pick<Props, 'customStyle'>) => `
    background: ${COLORS.BACKGROUNDGREYTWO};
    border-radius: 8px;

    ${props.customStyle}
    `,
);
