import React from 'react';
import MaterialTooltip from './MaterialTooltip';

interface TitleHomeProps {
    header: string;
    title: string;
    subTitle: string;
    showArrowDown?: boolean;
}

export default function TitleHome({ header, title, subTitle, showArrowDown = true }: TitleHomeProps) {
    return (
        <>
            <div className="title-home-section">
                <div className="title-title-row">
                    <h5 className="title-header">{header}</h5>
                </div>
                <div className="title-title-row">
                    {' '}
                    <h3 className="col-sm-10 col-md-10 col-lg-8 col-xl-9 title-title">{title}</h3>
                </div>
                <div className="title-title-row">
                    {' '}
                    <h5 className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-6 title-subTitle">{subTitle}</h5>
                </div>
                {showArrowDown && (
                    <MaterialTooltip tooltipText="Marketplace Featured Collections">
                        <div className="title-arrow-img-row">
                            <a href="#marketplace" className="title-arrow-img ri-arrow-down-line"></a>
                        </div>
                    </MaterialTooltip>
                )}
            </div>
        </>
    );
}
