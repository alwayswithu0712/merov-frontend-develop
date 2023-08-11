import styled from 'styled-components';

export const BoxDiv = styled.div`
    display: flex;
    padding: 5%;
    width: 80%;
    justify-content: center;
    height: 100%;
    border: 2px solid #2e2e2e;
    border-radius: 5px;
    flex-direction: column;
    justify-content: flex-start;
    @media (max-width: 1500px) {
        width: 100%;
    }
`;

export const BoxDivContainer = styled.div`
    display: flex;
    padding: 1% 0px;
    margin: 0px 10px;
    margin-left: 0px;
    width: 100%;
    justify-content: center;
    flex-direction: column;
`;

export const IconTextDivPassword = styled.div`
    display: flex;
    align-items: center;
`;

export const IdentityText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 33px;
    margin: 0px;

    margin-left: 10px;
`;

export const Label = styled.label`
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    user-select: none;
    color: #fff;
    margin-bottom: 0px;
`;
export const SmallerInputsDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const Divider = styled.div`
    border: 1px solid #121212;
    margin: 10px 0px;
`;

export const PasswordsNotMatchTitle = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ff4d4f;
`;
