import React from 'react';
import styled from 'styled-components';
import FullStarLogo from '../../../assets/icons/FullStarLogo';
import HalfStarLogo from '../../../assets/icons/HalfStarLogo';
import StarLogo from '../../../assets/icons/StarLogo';
import { showStarsProfile } from '../../../helpers/starsProfile';

interface Props {
    rating: number;
    size?: number;
    customStyle?: string;
}

export default function Stars({ rating, size = 10, customStyle }: Props) {
    const stars = showStarsProfile(rating);

    return (
        <StarsContainer className="w-fit flex flex-nowrap" customStyle={customStyle}>
            {stars.map((star, index) => (
                <div key={index} className="flex m-auto mr-1">
                    {getStars(star, size)}
                </div>
            ))}
        </StarsContainer>
    );
}

const getStars = (star: string, size: Props['size']) => {
    switch (star) {
        case 'empty':
            return <StarLogo width={size} height={size} />;
        case 'half':
            return <HalfStarLogo width={size} height={size} />;
        default:
            return <FullStarLogo width={size} height={size} />;
    }
};

const StarsContainer = styled('div')(
    (props: Pick<Props, 'customStyle'>) => `
    ${props.customStyle ? props.customStyle : ''}
`,
);
