import React from 'react';
import Button, { ButtonProps } from '../Button';
import ChatIcon from '../../../../assets/icons/ChatIcon';

const avaliableIcons = {
    chatIcon: <ChatIcon width={20} height={20} />,
};

const avaliableIconsNames = [...Object.keys(avaliableIcons)] as const;

interface Props extends Omit<ButtonProps, 'children' | 'loading' | 'size' | 'spinnerSize'> {
    iconName: typeof avaliableIconsNames[number];
}

export default function IconButton(props: Props) {
    const getIconName = (iconName: Props['iconName']): JSX.Element => avaliableIcons[iconName] || <></>;
    return (
        <Button
            {...props}
            customStyle={`    
                padding: 10px;
                min-width: fit-content;
                min-height: fit-content;
                ${props.customStyle && props.customStyle}
            `}
        >
            {getIconName(props.iconName)}
        </Button>
    );
}
