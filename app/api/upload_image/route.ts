import {uploadPhotoToGoogleDrive} from "@/db/googledrive";
import {NextResponse} from "next/server";

export async function POST(request: Request, context: { params: any })  {
    const data = await uploadPhotoToGoogleDrive(await request.text())

    return NextResponse.json(data);
}

