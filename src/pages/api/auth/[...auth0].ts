// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback, handleLogin, LoginOptions } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = (req: NextApiRequest, res: NextApiResponse, session: any) => ({
    ...session,
    user: {
        ...session.user,
        id: session.user.sub,
    },
});

export default handleAuth({
    async login(req, res) {
        const authorizationParams = {
            audience: process.env.AUTH0_MEROV_AUDIENCE,
            scope: process.env.AUTH0_SCOPE,
        };

        const options: LoginOptions = {
            authorizationParams,
        };

        options.returnTo = `/verify`;

        if (req.query.redirect) {
            options.returnTo = `/verify?redirect=${req.query.redirect}`;
        }

        try {
            await handleLogin(req, res, options);
        } catch (error: any) {
            res.status(error.status || 400).end(error.message);
        }
    },

    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error: any) {
            res.status(error.status || 400).end(error.message);
        }
    },
});
