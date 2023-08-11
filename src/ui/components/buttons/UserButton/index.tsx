import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import ShieldLogo from '../../../../assets/icons/ShieldLogo';
import COLORS from '../../../foundation/colors';
import Stars from '../../Stars';
import Button, { ButtonProps } from '../Button';
import { Account } from '../../../../typings/account';

export interface Props extends Omit<ButtonProps, 'children' | 'loading' | 'size' | 'spinnerSize'> {
    account: Account;
    href: string;
    showAvatar?: boolean;
    showName?: boolean;
    showStars?: boolean;
}

export default function UserButton(props: Props) {
    return (
        <Link href={props.href} passHref>
            <a>
                <Button
                    {...props}
                    customStyle={`  
        color: ${COLORS.WHITE};
        padding: 10px;
        min-width: fit-content;
        min-height: fit-content;
        ${props.customStyle && props.customStyle}
        `}
                >
                    {props.account.avatarUrl && props.showAvatar && (
                        <Image
                            loader={() => props.account.avatarUrl!}
                            unoptimized
                            src={props.account.avatarUrl}
                            height={24}
                            width={24}
                            className={'rounded-full'}
                            placeholder="blur"
                            blurDataURL="/images/icon.jpg"
                        />
                    )}
                    {props.showName && <>@{props.account.name}</>}
                    <ShieldLogo width={14} height={14} />
                    {props.showStars && <Stars size={13} rating={props.account.rating} />}
                </Button>
            </a>
        </Link>
    );
}
