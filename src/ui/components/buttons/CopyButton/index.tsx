import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CopyLogo from '../../../../assets/icons/CopyLogo';
import COLORS from '../../../foundation/colors';
import { copyToClipboard } from '../../../../helpers/copyToClipboard';

const CopyButton = ({ value }: { value: string }): ReactElement => {
    const handleClickCopy = () => {
        copyToClipboard(value);
    };

    return (
        <IconContainer className="align-middle float-right m-auto mr-0 cursor-pointer" onClick={handleClickCopy}>
            <CopyLogo height={18} width={18} />
        </IconContainer>
    );
};

export default CopyButton;

const IconContainer = styled.div`
    display: flex;
    border-radius: 8px;
    background-color: ${COLORS.ALMOSTBLACK};
    border: 1px solid ${COLORS.STROKEGREY};
    padding: 8px;
`;
