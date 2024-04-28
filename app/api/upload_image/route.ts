import {uploadPhotoToGoogleDrive} from "@/db/googledrive";
import {NextResponse} from "next/server";

export async function POST(request: Request)  {
    const data = await uploadPhotoToGoogleDrive(await request.text())

    return NextResponse.json(data);
}

