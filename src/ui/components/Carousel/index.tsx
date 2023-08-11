import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CarouselBootstrap from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import ZoomImage from '../ZoomImage';

type ImageLayout = 'responsive' | 'fill' | 'fixed' | 'intrinsic' | undefined;

interface Props {
    images: string[];
    width: number;
    height: number;
    imageLayout?: ImageLayout;
    zoomImage?: boolean;
    className?: string;
}

const renderCarusel = (images: string[], height: number, width: number, layout: ImageLayout, zoomImage = false, className = '') => (
    <div className={`overflow-hidden ${className}`}>
        {images.length > 1 ? (
            <CarouselStyled interval={null} variant="dark">
                {images.map((image) => (
                    <CarouselItem key={image}>
                        {zoomImage ? (
                            <ZoomImage imageUrl={image} height={height} width={width} layout={layout} />
                        ) : (
                            <Image
                                loader={() => image}
                                unoptimized
                                src={image}
                                height={height}
                                width={width}
                                layout={layout}
                                className="rounded-lg"
                                placeholder="blur"
                                blurDataURL="/images/icon.jpg"
                            />
                        )}
                    </CarouselItem>
                ))}
            </CarouselStyled>
        ) : zoomImage ? (
            <ZoomImage imageUrl={images[0]} height={height} width={width} layout={layout} />
        ) : (
            <Image
                loader={() => images[0]}
                unoptimized
                src={images[0]}
                height={height}
                width={width}
                layout={layout}
                placeholder="blur"
                blurDataURL="/images/icon.jpg"
                className="rounded-lg"
            />
        )}
    </div>
);

export default function Carousel({ images, height, width, imageLayout, zoomImage, className }: Props) {
    const [carousel, setCarousel] = useState(<></>);

    useEffect(() => {
        setCarousel(renderCarusel(images, height, width, imageLayout, zoomImage, className));
    }, [images, renderCarusel]);

    return carousel;
}

const CarouselItem = styled(CarouselBootstrap.Item)(
    () => `
    span {
        display: flex !important;
    }
`,
);

const CarouselStyled = styled(CarouselBootstrap)(
    () => `
    .carousel-indicators button {
        width: 10px;
        height: 10px;
        border-radius: 100%;
    }

    .carousel-control-prev-icon {
        background-image: url('data:image/svg+xml,<svg width="25" height="40" viewBox="0 0 25 40" fill="%23050505" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M11.2291 19.8488L16.3625 27.8158L14.8961 30.0916L8.29639 19.8488L14.8961 9.60596L16.3625 11.8818L11.2291 19.8488Z"/></g></svg>') !important;
    }
    
    .carousel-control-next-icon {
        background-image: url('data:image/svg+xml,<svg width="25" height="40" viewBox="0 0 25 40" fill="%23050505" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M13.7709 19.8485L8.63754 11.8815L10.1039 9.60563L16.7036 19.8485L10.1039 30.0913L8.63754 27.8155L13.7709 19.8485Z"/></g></svg>') !important;
    }
`,
);
