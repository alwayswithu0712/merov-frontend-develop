import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { IncomingForm } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { S3, Rekognition } from 'aws-sdk';
import fs from 'fs';

// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

const s3 = new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
});

const rekognition = new Rekognition({
    accessKeyId: process.env.AWS_S3_ACCESS_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
    apiVersion: '2016-06-27',
});

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // parse form with a Promise wrapper
        const data = (await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                return resolve({ fields, files });
            });
        })) as any;

        // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
        const imageFile = data.files.image;

        const imagePath = imageFile.filepath;

        if (data.files) {
            try {
                const img = fs.readFileSync(imagePath);

                const param2 = {
                    Image: {
                        Bytes: img,
                    },
                };

                const response = await rekognition.detectModerationLabels(param2).promise();
                const detections = response.ModerationLabels;

                if (detections && detections.length > 0) {
                    console.error(`Image uploaded contains inappropiate content, ${JSON.stringify(detections)}`);
                    return res.status(400).json({ error: 'Image contains inappropriate content' });
                }

                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME as string,
                    Key: imageFile.newFilename,
                    Body: img,
                    ContentType: imageFile.mimetype,
                };

                const data = await s3.upload(params).promise();
                return res.json({
                    success: true,
                    data: {
                        url: data.Location,
                    },
                });
            } catch (error) {
                console.error(`Error uploading image: ${JSON.stringify(error)}`);
            }
        }
    } catch (error: any) {
        console.log(error);
        return res.status(error.status || 400).json({ error: error.message });
    }

    return res.status(400).json({});
};

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return handlePost(req, res);
    }
    return res.status(405).json({ error: 'Method not allowed' });
});
