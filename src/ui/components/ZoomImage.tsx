import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import InnerImageZoom from 'react-inner-image-zoom';
import isValidImage from '../../helpers/isValidImage';

type ImageLayout = 'responsive' | 'fill' | 'fixed' | 'intrinsic' | undefined;

interface Props {
    imageUrl: string;
    width: number;
    height: number;
    layout: ImageLayout;
}

const ZoomImage = ({ imageUrl, height, width, layout }: Props) => {
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const checkImage = async () => {
            const isValid = await isValidImage(imageUrl);
            setIsValid(isValid);
        };
        checkImage();
    }, [imageUrl]);

    return isValid ? (
        <InnerImageZoom src={imageUrl} zoomType={'hover'} zoomPreload fadeDuration={200} fullscreenOnMobile={true} className="rounded-lg" />
    ) : (
        <Image
            loader={() => imageUrl}
            unoptimized
            src={imageUrl}
            placeholder="blur"
            blurDataURL="/images/icon.jpg"
            height={height}
            width={width}
            layout={layout}
            className="rounded-lg"
        />
    );
};

export default ZoomImage;
