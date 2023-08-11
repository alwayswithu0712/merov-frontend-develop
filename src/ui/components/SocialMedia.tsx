import Link from 'next/link';
import React from 'react';

interface SocialMediaProps {
    image: string;
    text: string;
    link: string;
}

export default function SocialMedia({ image, text, link }: SocialMediaProps) {
    return (
        <>
            <Link href={`${link}`} passHref>
                <a target="_blank" rel="noopener noreferrer">
                    <div className="social-media">
                        <div className="icons">
                            <i className={`${image}`}></i>
                        </div>
                        <div className="title"> {text}</div>
                    </div>
                </a>
            </Link>
        </>
    );
}
