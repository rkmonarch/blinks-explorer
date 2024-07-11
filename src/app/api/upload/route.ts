import formidable from 'formidable';
import fs from 'fs';
import PinataClient from '@pinata/sdk';
const pinata = new PinataClient({ pinataJWTKey: process.env.PINATA_JWT });

interface UploadedFile {
    filepath: string;
    originalFilename: string;
}

const saveFile = async (file: UploadedFile) => {
    try {
        const stream = fs.createReadStream(file.filepath);
        const options = {
            pinataMetadata: {
                name: file.originalFilename,
            },
        };
        const response = await pinata.pinFileToIPFS(stream, options);
        fs.unlinkSync(file.filepath);

        return response;
    } catch (error) {
        throw error;
    }
};

export default async function GET(req: any, res: any) {
    if (req.method === 'POST') {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log({ err });
                    return res.send(err);
                }
                const response = await saveFile(files.file as unknown as UploadedFile);
                console.log({ response });
                const { IpfsHash } = response;

                return res.status(200).send({
                    hash: IpfsHash,
                });
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Server Error');
        }
    } else if (req.method === 'GET') {
        try {
            const response = await pinata.pinList({
                pageLimit: 1,
                pageOffset: 0,
            });
            res.json(response.rows[0]);
        } catch (e) {
            console.log(e);
            res.status(500).send('Server Error');
        }
    }
}