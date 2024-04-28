import { google } from 'googleapis';
import * as stream from "node:stream";

const AUTH = new google.auth.GoogleAuth({
    keyFile: "./google_credentials.json",
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const DRIVE = google.drive({ version: 'v3', auth: AUTH })

export async function uploadPhotoToGoogleDrive(b64String: string): Promise<any> {
    const fileMetadata = {
        name: 'photo.jpg',
        mimeType: 'image/jpeg'
    };

    try {
        const buf = Buffer.from(b64String.split(/,(.+)/)[1], 'base64')
        const bs = new stream.PassThrough(); // Added
        bs.end(buf); // Added
        const response = await DRIVE.files.create({
            requestBody: fileMetadata,
            media: {
                mimeType: "image/jpeg",
                body: bs,
            },
            fields: 'id',
            resource: {
                name: "photo.jpeg",
                parents: ["1nGFGZKdo-AvK7t7o7CaeCRo35NQXWP6C"],
                mimeType: "image/jpeg",
            }
        } as any);

        await DRIVE.permissions.create({
            fileId: response.data.id || "",
            resource: {
                type: 'anyone',
                role: 'reader',
                allowFileDiscovery: true
            }
        } as any);

        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}

export async function fetchFile(id: string) {
    return fetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`, {
        headers: {
            "authorization": `Bearer ${await AUTH.getAccessToken()}`
        }
    })

}
