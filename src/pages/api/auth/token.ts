import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const session = getSession(req, res);
        if (session) {
            const token = {
                access_token: session?.accessToken,
                expires_at: session?.accessTokenExpiresAt,
                refresh_token: session?.refreshToken,
            };
            return res.status(200).json(token);
        }
    }
    return res.status(200).json(null);
};
