import styled from 'styled-components';
import COLORS from '../../../foundation/colors';

export const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 4% 0px;
    width: 100%;
`;

export const TextDiv = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
`;

export const UserName = styled.h4`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
    color: ${COLORS.WHITE};
    margin-left: 5%;
    margin-right: 10px;
    margin-bottom: 0px;
    @media (max-width: 800px) {
        margin-left: 1%;
        margin-bottom: 3px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
    }
`;
export const Title = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin-left: 2%;
    @media (max-width: 800px) {
        width: 100%;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 40px;
        margin-left: 0%;
        margin-top: 2%;
    }
`;
export const ProfileImg = styled.img`
    border-radius: 50%;
    width: 15%;
    min-width: 75px;
`;
export const ImageAndName = styled.div`
    display: flex;
    padding: 0px 5%;
    align-items: center;
`;
export const PerosnalInfoDiv = styled.div`
    display: flex;
    border: 2px solid #2e2e2e;
    width: 100%;
    padding: 5%;
    flex-direction: column;
    border-radius: 5px;
    @media (max-width: 1350px) {
        margin-bottom: 30px;
    }
    @media (max-width: 800px) {
        border: none;
        padding: 0%;
    }
`;
export const SmallerInputsDiv = styled.div`
    display: flex;
    margin: 10px 0px;
    justify-content: space-between;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;
export const Label = styled.label`
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    user-select: none;
    color: #fff;
    margin-bottom: 0px;
`;
export const BirthdayDiv = styled.div`
    width: 49%;
    @media (max-width: 800px) {
        width: 100%;
    }
`;
export const InputWidth = styled.div`
    width: 49%;
    @media (max-width: 800px) {
        width: 100%;
    }
`;
export const ReferralBox = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1.5%;
    justify-content: flex-start;
    width: 100%;
    margin-top: 8%;
    @media (max-width: 950px) {
        width: 100%;
        padding-left: 0%;
        align-items: flex-start;
        margin: 2% 0%;
    }
`;
export const ShareLogoDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @media (max-width: 800px) {
        margin-top: 30px;

        width: 100%;
    }
`;
export const ShareLogoDivVerify = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
`;

export const GetVerified = styled.h4`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: ${COLORS.GREEN};
    margin: 0px;
    margin-left: 10px;
    @media (max-width: 800px) {
        width: 100%;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
    }
`;

export const Referral = styled.h4`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: ${COLORS.GREEN};
    margin: 0px;
    margin-left: 10px;
    @media (max-width: 800px) {
        width: 100%;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 40px;
    }
`;
export const Benefits = styled.h4`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: ${COLORS.WHITE};
    opacity: 0.98;
    margin: 0px;
`;

export const UrlDiv = styled.div`
    border: 2px solid #2b2b2b;
    border-radius: 100px;
    padding: 2% 4%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    width: 70%;
    min-width: 200px;
    margin-top: 10px;
    @media (max-width: 800px) {
        padding: 0.5% 4%;
        width: 50%;
    }
    @media (max-width: 600px) {
        width: 60%;
    }
    @media (max-width: 500px) {
        width: 100%;
    }
`;
export const Url = styled.h4`
    margin: 0px;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 40px;
    color: #47e6b6;
`;
export const CopyButton = styled.div`
    display: flex;
`;
export const Container = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    @media (max-width: 1350px) {
        flex-direction: column;
    }
    @media (max-width: 800px) {
        width: 100%;
        justify-content: center;
    }
`;
export const CopySpan = styled.span`
    margin-left: 6px;
`;
export const ReviewsText = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    opacity: 0.6;
    text-align: end;
    margin-top: 10px;
    @media (max-width: 800px) {
        text-align: start;
        margin-top: 4px;
        margin-left: 1%;
    }
`;
export const TextAndButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
export const TextAndButtonsMobile = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 20px 0px;
`;
export const VerificationsDiv = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #121212;
    border-radius: 5px;
    width: 100%;
    margin: 10px 0px;
    padding: 3% 3%;
    @media (max-width: 800px) {
        padding: 3% 5%;
    }
`;
export const TaskTest = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    @media (max-width: 800px) {
        padding: 2% 0%;
        width: fit-content;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
        white-space: nowrap;
    }
`;
export const InReview = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: #fcb90d;
`;
export const Approved = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: #47e6b6;
`;
export const Reject = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: #ea4335;
`;
export const TasksDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
export const AllDiv = styled.div`
    width: 100%;
    margin-right: 40px;
`;
export const StartsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    @media (max-width: 800px) {
        margin-top: 0px;
        justify-content: flex-start;
    }
`;
export const StartsContainerAll = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
`;
export const RightDivWidth = styled.div`
    width: 80%;
    @media (max-width: 800px) {
        width: 100%;
    }
`;

export const ImgContainer = styled.div`
    display: flex;
    height: 100px;
    width: 100%;
    background: ${COLORS.PANNELGREY};
    border: 1px solid ${COLORS.STROKEGREY};
    padding: 3%;
    justify-content: flex-start;
    align-items: center;
    border-radius: 2px;
`;
export const UserImage = styled.img`
    border-radius: 50%;
    width: 45px;
    margin-right: 2px;
`;
export const NameAndRating = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 5px;
    @media (max-width: 800px) {
        width: 100%;
    }
`;
