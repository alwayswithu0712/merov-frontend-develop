import React from 'react';

interface EscrowPropertyCardProps {
    image: string;
    title: string;
    text: string;
}

export default function EscrowPropertyCard({ image, title, text }: EscrowPropertyCardProps) {
    return (
        <>
            <div className="escrow-property-img-div">
                <i className={`${image}`}></i>
            </div>
            <div className="escrow-property-card">
                <div>
                    <div className="escrow-property-title">{title}</div>
                    <div className="escrow-property-text">{text}</div>
                </div>
            </div>
        </>
    );
}
