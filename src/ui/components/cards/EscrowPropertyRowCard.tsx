import React from 'react';

interface EscrowPropertyRowCardProps {
    title: string;
    text: string;
}

export default function EscrowPropertyRowCard({ title, text }: EscrowPropertyRowCardProps) {
    return (
        <>
            <div className="escrow-property-row-card">
                <div className="why-merov-item">
                    <i className="why-merov-substract ri-subtract-fill"></i>
                    <div className="escrow-title">{title}</div>
                </div>
                <div className="escrow-text">{text}</div>
            </div>
        </>
    );
}
