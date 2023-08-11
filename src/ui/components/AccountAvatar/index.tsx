import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import COLORS from '../../foundation/colors';
import Stars from '../Stars/index';

interface Props {
    name: string;
    avatarUrl?: string;
    rating?: number;
    deliveryAddresses?: String;
    createdAt?: Date;
    reviewCount?: number;
    variant: VARIANT;
    href: string;
    imageSize: number;
    showName?: boolean;
    showStars?: boolean;
    showAddress?: boolean;
    showJoined?: boolean;
    showReviews?: boolean;
    isMobileMenu?: boolean;
    animatePhoto?: boolean;
}

export enum VARIANT {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}

export default function AccountAvatar({
    name,
    avatarUrl,
    rating,
    deliveryAddresses,
    reviewCount,
    variant,
    createdAt,
    href,
    imageSize,
    animatePhoto = false,
    isMobileMenu = false,
    showName = false,
    showStars = false,
    showAddress = false,
    showJoined = false,
    showReviews = false,
}: Props) {
    const router = useRouter();

    return (
        <Link href={href} passHref>
            <a>
                <AccountContainer path={router.pathname} variant={variant} showStars={showStars} showReviews={showReviews}>
                    {avatarUrl && (
                        <AccountImage variant={variant} imageSize={imageSize} showStars={showStars} showReviews={showReviews}>
                            <Image
                                loader={() => avatarUrl!}
                                unoptimized
                                src={avatarUrl}
                                height={imageSize}
                                width={imageSize}
                                className={`rounded-full ${animatePhoto ? 'animate__animated animate__zoomIn animate__faster' : ''}`}
                                placeholder="blur"
                                blurDataURL="/images/icon.jpg"
                            />
                        </AccountImage>
                    )}

                    <NameAndData variant={variant} showStars={showStars} showReviews={showReviews} isMobileMenu={isMobileMenu}>
                        {variant === VARIANT.HORIZONTAL ? (
                            <>
                                <DataHorizontal variant={variant} showStars={showStars} showReviews={showReviews}>
                                    {showName && (
                                        <>
                                            <UserName
                                                variant={variant}
                                                isMobileMenu={isMobileMenu}
                                                showStars={showStars}
                                                showReviews={showReviews}
                                            >
                                                @{name}
                                            </UserName>
                                        </>
                                    )}
                                    {showStars && (
                                        <StarsDiv variant={variant} showStars={showStars} showReviews={showReviews}>
                                            <Stars rating={rating} size={20} />
                                        </StarsDiv>
                                    )}
                                </DataHorizontal>
                                {showReviews && (
                                    <div className="opacity-60 text-start mt-1 lg:mt-2.5 lg:text-end ml-2 leading-6">
                                        ({reviewCount} Reviews)
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {variant === VARIANT.VERTICAL && (
                                    <>
                                        {showName && (
                                            <>
                                                <UserName
                                                    variant={variant}
                                                    isMobileMenu={isMobileMenu}
                                                    showStars={showStars}
                                                    showReviews={showReviews}
                                                >
                                                    @{name}
                                                </UserName>
                                            </>
                                        )}
                                        <div className="w-full flex justify-end flex-col gap-2">
                                            {showAddress && deliveryAddresses && <div>{deliveryAddresses}</div>}
                                            {showJoined && (
                                                <div className="flex gap-1 justify-center md:justify-start">
                                                    <div>Joined</div>
                                                    <div>{moment(createdAt).format('MM/DD/YYYY')}</div>
                                                </div>
                                            )}
                                            {showStars && rating && (
                                                <div className="w-full flex justify-center">
                                                    <Stars rating={rating} size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </NameAndData>
                </AccountContainer>
            </a>
        </Link>
    );
}

AccountAvatar.defaultProps = {
    isMobileMenu: false,
    showName: false,
    showStars: false,
    showAddress: false,
    showJoined: false,
    showReviews: false,
};

const AccountContainer = styled('div')(
    (props: { variant: VARIANT; path: string; showStars: boolean; showReviews: boolean }) => `
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    ${
        props.variant === VARIANT.VERTICAL &&
        `padding-left: 1.25rem;
        padding-right: 1.25rem;`
    };
    ${
        props.showStars &&
        !props.showReviews &&
        `margin-top: 30px;
        height: 70px;
        border: ${props.path.includes('profile') ? ` 1px solid transparent` : '1px solid transparent'};
        border-left: ${props.path.includes('profile') ? `5px solid ${COLORS.GREEN}` : `5px solid transparent`};`
    };
    @media (max-width: 800px) {
        ${props.showStars && !props.showReviews && 'width: 60%;'};
        ${
            props.variant === VARIANT.VERTICAL &&
            `display:grid;
            justify-content: center;
            text-align: center;
            `
        };
        ${
            props.showStars &&
            props.showReviews &&
            `padding-left: 0;
            padding-right: 0;`
        };
    };
`,
);

const DataHorizontal = styled('div')(
    (props: { variant: VARIANT; showStars: boolean; showReviews: boolean }) => `
    ${
        props.showStars &&
        props.showReviews &&
        ` 
        display: flex;
        gap: 8px;
        margin-left: 8px
        `
    };

`,
);

const StarsDiv = styled('div')(
    (props: { variant: VARIANT; showStars: boolean; showReviews: boolean }) => `
    ${
        props.showStars &&
        props.showReviews &&
        ` 
        display: flex;
        width; 100%;
        justify-content:flex-end;
        flex-direction: column
        gap: 8px;
        `
    };
`,
);

const NameAndData = styled('div')(
    (props: { variant: VARIANT; showStars: boolean; showReviews: boolean; isMobileMenu: boolean }) => `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 5px;
    ${
        props.variant === VARIANT.VERTICAL &&
        ` 
        padding:10px 15px 10px 15px;
        gap: 10px;
        `
    };
    @media (max-width: 800px) {
        width: 100%;
        ${!props.showStars && !props.showReviews && !props.isMobileMenu && 'display: none'};
        ${
            props.variant === VARIANT.VERTICAL &&
            `display:grid;
            justify-content: center;
            text-align: center;
            margin-left: 0px;
             `
        }
    };
`,
);

const AccountImage = styled('div')(
    (props: { variant: VARIANT; imageSize: number; showStars: boolean; showReviews: boolean }) => `
    border-radius: 50%;
    margin-right: 2px;
    width: ${props.imageSize}px;
    height: ${props.imageSize}px;
    ${props.showStars && !props.showReviews && ` margin-left: 4px;`};  

    @media (max-width: 800px) {
        ${
            props.variant === VARIANT.VERTICAL &&
            `    
            display: block;
            margin-left: auto;
            margin-right: auto; 
             `
        }
    };

`,
);

const UserName = styled('h2')(
    (props: { variant: VARIANT; isMobileMenu: boolean; showStars: boolean; showReviews: boolean }) => `
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    ${
        !props.showStars &&
        !props.showReviews &&
        `margin: 0px;
        font-size: 14px;
        font-weight:600;
        &:hover {
            color: ${COLORS.GREEN};
        };`
    };
    ${
        props.variant === VARIANT.VERTICAL &&
        `
        font-weight:600;
        `
    };
    @media (max-width: 800px) {
        ${!props.showStars && !props.showReviews && !props.isMobileMenu && 'display: none'}
    };
`,
);
