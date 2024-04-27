import { NextResponse } from "next/server";
import { getPaket } from "@/db/db";

export async function GET(request: Request, context: { params: any })  {
  const data = await getPaket(context.params?.paketID)

  return NextResponse.json(data?[data]: []);
}
