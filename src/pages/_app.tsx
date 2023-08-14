import React, { ReactElement, ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import '../../public/css/style.css';
import '../../styles/globals.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'antd/dist/antd.css';
import 'animate.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import { SardineEnvironment } from '@sardine-ai/react-js-wrapper';
import { wrapper } from '../store/store';
import ErrorBoundary from '../helpers/ErrorBoundary';
import PageRenderer from '../ui/layouts/PageRenderer';
import { useSardine } from '../hooks/useSardine';
import '@fortawesome/fontawesome-svg-core/styles.css'

const sardineClientId = process.env.NEXT_PUBLIC_SARDINE_CLIENT_ID;
const sardineEnviroment = process.env.NEXT_PUBLIC_SARDINE_ENVIRONMENT;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type MyAppProps = Omit<AppProps, 'router'> & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: MyAppProps) {
    const { SardineProvider } = useSardine();
    const domain = process.env.AUTH0_BASE_URL?.split('://')[1] || 'develop.merov.io';

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <ErrorBoundary>
                <SardineProvider clientId={sardineClientId!} environment={sardineEnviroment! as SardineEnvironment}>
                    <PlausibleProvider domain={domain}>
                        <UserProvider>
                            <PageRenderer Component={Component} pageProps={pageProps} />
                        </UserProvider>
                    </PlausibleProvider>
                </SardineProvider>
            </ErrorBoundary>
        </>
    );
}

export default wrapper.withRedux(MyApp);
