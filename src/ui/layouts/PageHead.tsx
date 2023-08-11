import Head from 'next/head';
import React from 'react';

export interface PageHeadProps {
    headTitle?: string;
}

function PageHead({ headTitle }: PageHeadProps) {
    return (
        <>
            <Head>
                <title>{headTitle || 'Merov'}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
        </>
    );
}
export default PageHead;
