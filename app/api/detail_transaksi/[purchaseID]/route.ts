import { NextResponse } from "next/server";
import {fetchDetailPurchase} from "@/db/db";

export async function GET(request: Request, context: { params: any })  {
    const data = await fetchDetailPurchase(context.params?.purchaseID)

    return NextResponse.json(data);
}
