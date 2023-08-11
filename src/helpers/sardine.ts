import { notification } from 'antd';
import merovService from '../services/merov';
import { SardineDocumentVerifyRequest } from '../typings/sardine';

export const createSardineTab = async (dataToSend?: SardineDocumentVerifyRequest): Promise<boolean> => {
    try {
        const documentVerificationResponse = await merovService.secureApi().getDocumentVerificationUrl(dataToSend);
        if (documentVerificationResponse) {
            const left = window.screen.width;
            const top = window.screen.height;
            window.open(documentVerificationResponse.link.url, 'Verify your id', `resizable=yes, width=1200, height=720, top=${top}, left=${left}`);
            return true;
        }
        notification.open({
            message: 'Error sending verification',
            description: 'Error sending verification. Please try again',
            className: 'error',
        });
        return false;
    } catch {
        notification.open({
            message: 'Error sending verification!',
            description: 'Error sending verification. Please try again later',
            className: 'error',
        });
        return false;
    }
};
