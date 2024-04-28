import { google } from 'googleapis';
import * as stream from "node:stream";

const AUTH = new google.auth.GoogleAuth({
    credentials: {
        type: "service_account",
        project_id: "albayt-backup-test-421613",
        private_key_id: "a1ce720ebed39e21fb99e99e07bf302601e65355",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCRXZEaqaCR7BQW\nkfBDTYz2e0G++uNEtk71G1pAI43gukwmlFjo2Psdd7s4gRAB1Sw0qOQxyINxP5CW\nyHHP/ZD5O+uMDNBY+DZ4jUtW3M7e/DudT1Fkr2NZ8VM9HctDSpp5EMaIKxkAremX\n7vNh+S7oQbu6u3aFcbBWWvzBQCWeuz3CA9CxODLXEI/sb9+yCr6pmfiF7zaE6fwS\nLf4MciByzpUfafgeflLeBNUseIYHFhC6YROsDnl5Wej2nEAMzppMg8pRfJMTZb22\nZWcNAUqIwhks1dGtr0l8p8CDyd6QJwErTaO6n/ujYK1b7Zkf0y2O5w+QuBabBEih\nwJXdazitAgMBAAECggEAAKOb6CBwceMj39Y4+H5fMGBP4dbgHF5G56HDaLP8DG0P\nYKtZtNdjX+ZFe5ThBxDfM1d06XZDSn6Hd6rlBKHIdzGFcQzpaaDD3MmtlqNZs6Zl\nCeLdB8wZPOWI+W1apbfGKGTmSwqesLHMhDohUX7R337c2xfqsgrTJretDsinQv6p\nirRwoUcHhPttethK1wnf+OYpyqKxqoaHleqTAisetk5+4LNBXKgXj693kok/GKxL\nAtdxETKtV/nbN4tUkI3yEJcwpY/RDdgFQ25lA0Ncc3s7s6QorRQi60TqhEhA4Q45\nSjyrB2oy7WVZAWgYIL1t/fmk8MtdOxSxaDYW8C8XAQKBgQDE8WYGN9n1rJd7POAW\nSdDuXyI28JxDygEVN+lhofc2HIkKymrrEbOHewSct+xdWJuc0WWDrlXNEDxkhyIM\nGpLCW9HO6pQ5/xvBvhuJxPf3rRPEVu/U8d7sMx3khOmDD7+HMZyGWovfpcNYn52y\nBOOvbcFiS4Uil/tdOyMUEq90gQKBgQC89MCBu9zNEj2rA4RRKMfVdb81i6Up6TMg\niLGwWGD7zNN19W4S50EFxVMuokGwoIPam/+216BGnb0b6Ovb1dINxRi1OV1jask2\nq6X0Ecm75J6ezLhrhzTmkZaiIbaSyMKXmh4pVRZe/JTcNhluF8ilj51Qzhbs8Z0w\nQu8Ynhy+LQKBgDPADwQRRwfEW2W5wFR6/xi0DOSM4zL48MHnmD7cdX5VjzkzqVat\npxQxoiugNM7uiq1xZJBujgM9gfEUhUDS9r91qzMI9vwqadvGHaxdAp+lbi1Ifurg\nx6gfYnp65nVW/QgEZFH1lw2knCk8gA6YNFATsh4nJAvMDfQYpwYORuaBAoGBALDB\n25sAm6oSGDHzlkE9fsIF5Zo3SYeNKFCUznOCGSczEdTUg+WXAlJdplSHYB/T58QG\nDg2CY+HrCM4k8w2wVVCgQV61jNDFQfisVQ+d3DKxyFgQdavQzQGqy1hbZSimOLIM\nb46Gk+jDKpVc3ikIgp+tWqIOR4/a7QoKcxN6RLT5AoGBAKRFT2ZtpDinUsvVgVY9\n1Ine768Hey2Bvxq+UtFocx6AGeAPXIXvzN8ki2QZd5lwe+mFONUgHpEIKkSHgv16\nin2Ykj4+QX5kirb6oVj3cpPofBOQolpczCEjkXNBrwUD0UXQCrEhwdR799DjSxK7\nsnPOSuIBNj6it4qexVoCvKYt\n-----END PRIVATE KEY-----\n",
        client_email: "gdrive-api@albayt-backup-test-421613.iam.gserviceaccount.com",
        client_id: "113930595265359821440",
        universe_domain: "googleapis.com",
        token_url: "https://oauth2.googleapis.com/token",
    },
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
