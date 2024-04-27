import { google } from 'googleapis';
import fs from 'fs';
import readline from 'readline';

const credentialsPath = 'path/to/credentials.json'; // Ganti dengan path berkas kredensial yang Anda unduh dari Google Developer Console

export async function uploadPhotoToGoogleDrive(filePath: string) {
    try {
        const auth = await authorize();
        return await uploadPhoto(auth, filePath);
    } catch (error) {
        console.error('Error uploading photo to Google Drive:', error);
        throw error;
    }
}

// Fungsi untuk mengunggah berkas foto ke Google Drive dan mengambil direct link-nya
async function uploadPhoto(auth: any, filePath: string) {
    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: 'photo.jpg', // Ganti dengan nama yang Anda inginkan
        mimeType: 'image/jpeg'
    };
    const media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(filePath)
    };

    try {
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'webViewLink, webContentLink' // Mendapatkan tautan web dan tautan konten web
        });

        console.log('Web View Link:', response.data.webViewLink);
        console.log('Direct Image Link:', response.data.webContentLink); // Direct link to the image

        // Return direct link to the image
        return response.data.webContentLink;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}

// Fungsi untuk mengotorisasi dan mendapatkan OAuth2 client
async function authorize() {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Baca token akses yang sudah disimpan sebelumnya atau jalankan alur otorisasi interaktif
    try {
        const token = fs.readFileSync('token.json', 'utf-8');
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    } catch (err) {
        return getAccessToken(oAuth2Client);
    }
}

// Fungsi untuk mendapatkan token akses baru
async function getAccessToken(oAuth2Client: any) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/drive']
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', async (code) => {
        rl.close();
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        // Simpan token akses untuk penggunaan selanjutnya
        fs.writeFileSync('token.json', JSON.stringify(tokens));
        return oAuth2Client;
    });
}
