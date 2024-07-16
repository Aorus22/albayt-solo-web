'use server';
import { google } from "googleapis";

export async function getSheetData(spreadsheetId: string, range: string) { 
  const glAuth = await google.auth.getClient({
        projectId: "YOUR_PROJECT_ID",
        credentials: {
            "type": "service_account",
            "project_id": "albayt-solo-web-50c59",
            "private_key_id": "393efc9acb2174e58d638593b5fed898c79dd9ef",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFaNC2HdBwogGV\nELXFCsztaYjKLc5fzlxTTit/jrdY+JmxtKVisSYeDVSzNZC3kCtmvN9m9BUDqb5K\nBJxmgGXpGeAavWl5fI7jNFo/7RopqaZS/3skhb5BboClJRuazKXdHEOkHvw/MJD5\nMd/eZeE8XCjS6IG30AuteGS3/8yazP/NBe55DuW/6ciZJB/V949LuInyDw4N5991\nVFapLSIyh8ctgUH7i+lhlIbecFLBnCQL9RdpWXLRR84/p4uwKfzKY10AMeswBdlE\nrmPEyceaT4uVh3EJ7dRfIP5AkjnFAUGLEFkD+issMDSMUMrUcdIH0sL22o1pTT4p\nzMV6LvJnAgMBAAECggEAQKdLc9nf4oOssP2ACsC2zSq7Ojw2UvprEn2PkX9UXTdO\nXv0jDWenbEBBdVAdzYDSNhu1rypRl5mIUQWhk5CJ0AZBd4CBguBgi9khlb45y1tc\nteImmpeS8CsYxv2YROKxj/Ep1h6vzqJBWNwUzengEry8QhcUJPdmW7IKipikki3t\nsFPU/FC10jYAxc7JFfEEQeTyg/b7oXJBpl0b6NhBIHFicCBELT5Vjr2SFEN2WbPB\nlXdnDgQR/LxhGobYyqgZgTq8fmlcFEBk+G9CV6vgaXhvqCUnK8E4OvVDLUwl3jh4\nFVdvjkSn4Y+2oocHYes4/M/ytDMQ2uAS93yKXgKMAQKBgQD5Mw58tv3vGn7/nUWG\nmfOJJEVg1wTCTmoC6SX2Oi3S8z4L4gy6xoCkLGzraODTbti+hqZBhj+GiwZgvXur\nD5PGysq93cuHjmtoD1+3RDWxSg6ymleNRoL/OetVWw1i/H1SMaLT9QCsuKOus/Xo\nzJ8gm7aGEpnIHC3GMds6msdVJwKBgQDKy/I6grzgeZNlg+/6NzhJGeLvXkpTFwNP\nnIMUICJmI338KMl9+0mjg1uxw7w3UX9r5iSbnnXO4Hd1cObaN22cE8YRDAC97EKl\nMyhhCpIVGs96/Wtv6wKXXJSe2O6d+5UhRx0fFi0KWhPqSn/6EGEdJWVtaJ77I+Ru\nn3/I9TJAwQKBgEjdp//JlijDC518hCbefzp7k5nEZYzXVuIxADumOV30aBEbcPNw\nNY9LujF/gjXwtInJX3XLZmnV3vCMl0umi2RWScAIyYmCmF9eF3PECxsi93c78BvM\nIWO1sN1NeXWXNKHDB8SIYEEg4COmVWJT6rejMFS1vaeora3FSEAzn9ODAoGBAJ6s\ngLUDQmGo/ok5eHUg66tW09dSwXjN0sthvLXshr3AG31HNJCcI3wK9Z3bdtMZs0dr\nZU1V6Pubahy74ATxxZOPbTQ9Xf88ctDrfDahnLdiqOCklIGXMgnYaHj5Z4q5JHBL\nQh/mrAsje92fuQ6h7jpt3jSC3ZHG/Z8IsWU9ZLqBAoGBAIQJ+/Yf4e5uoZREKAuG\nUnX+ZnKq49jClJIJNn9usD+Drnnha4Z7bcsuVofd4RHHuypFUCoTOXc3IP1fBQDv\n8xg/Z4eVxaseFTp296cgDHkttv0n3ysY8XNserz9JAivO4wb/wGu+gK8REprk+oF\nvRFKxbSPLcqCdpKIYR3Oh3X0\n-----END PRIVATE KEY-----\n",
            "client_email": "spreadsheet-database@albayt-solo-web-50c59.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    });

    return data.data.values;
}