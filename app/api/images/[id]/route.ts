import {fetchFile, uploadPhotoToGoogleDrive} from "@/db/googledrive";
import {NextResponse} from "next/server";

export async function GET(request: Request, context: { params: any })  {
    const response = await fetchFile(context.params.id)
    return new Response(response.body, {
        headers: {
            "Content-Disposition": "inline"
        }
    })
}

export async function POST(request: Request)  {
    const data = await uploadPhotoToGoogleDrive(await request.text())

    return NextResponse.json(data);
}