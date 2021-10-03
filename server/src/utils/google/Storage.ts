import { Storage, Bucket } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

import { config } from "src/config";
import { Maybe } from "src/core/logic";

const mime = require("mime-types");

const storage = new Storage({
    projectId: config.google.projectId,
    credentials: {
        client_email: config.google.clientEmail,
        private_key: config.google.privateKey,
    },
});

export interface GoogleFile {
    size: number;
    type: string;
    url: string;
    bucket: string;
    name: string;
}

type GoogleStorageParams = {
    bucket: string;
    url?: string;
};

export class GoogleStorage {
    private readonly content: Bucket;
    private readonly url: Maybe<string>;

    constructor({ bucket, url }: GoogleStorageParams) {
        this.content = storage.bucket(bucket);
        this.url = url || null;
    }

    async upload(fileData: any, path?: string): Promise<GoogleFile> {
        const { url: urlPrefix } = this;

        const fileName: string = fileData.originalname?.replace(/ /g, "");
        const file = this.content.file(
            `${path || "files"}/${uuidv4()}/${fileName}`
        );

        // Use file mimetype as passed (this is needed for google drive files, dropbox, etc...)
        // fallback to a mime lookup and then back to null
        const contentType = fileData.mimetype || mime.lookup(fileName) || null;

        return new Promise<GoogleFile>((resolve, reject) => {
            const stream = file.createWriteStream({
                metadata: {
                    contentType,
                },
                contentType,
                resumable: false,
            });

            stream.on("error", (err) => reject(err));

            stream.on("finish", () => {
                const url = `${urlPrefix}/${file.name}`;
                return resolve({
                    url,
                    type: contentType,
                    size: file.metadata.size,
                    bucket: file.bucket.name,
                    name: fileName,
                });
            });

            stream.end(fileData.buffer);
        });
    }
}

export const ImageGoogleStorage = new GoogleStorage({
    bucket: config.google.imageBucket,
});
