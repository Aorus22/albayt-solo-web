export const fetchCache = 'force-no-store';
import { NextResponse } from "next/server";
import { getUser } from "@/db/db";

export async function GET(request: Request, context: { params: any })  {
  const data = await getUser(context.params?.UID)

  return NextResponse.json(data?[data]: []);
}
