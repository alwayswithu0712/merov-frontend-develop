import React from 'react';

interface PageTitleProps {
    pageTitle?: string;
    textAlign?: string;
    pageTitleSub?: string;
    parent?: string;
    child?: string;
}

export default function PageTitle({ textAlign }: PageTitleProps) {
    return (
        <>
            <div className={`promotion-detail row page-title-row ${textAlign}`}>
                {/* <h3 className="text-white mb-3">
                    Discover, Collect, Sell <br /> and Create your Own NFT
                </h3>
                <p>Digital marketplace for crypto collectibles and non fungable tokens</p> */}
            </div>
        </>
    );
}
