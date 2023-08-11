import { getImageSize } from 'react-image-size';
import { minImageSize } from '../config/product';

const rejectTimeout = {
    timeout: 5000,
};

const isValidImage = async (imageUrl: string) => {
    try {
        const { width, height } = await getImageSize(imageUrl, rejectTimeout);
        return minImageSize < width && minImageSize < height;
    } catch (errorMessage) {
        return true;
    }
};

export default isValidImage;
