import { NextResponse } from "next/server";
import { getUser } from "@/db/db";
import { NextApiRequest} from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
const dbName = "albayt-solo";

export async function GET(request: Request, context: { params: any })  {
  const data = await getUser(context.params?.UID)

  return NextResponse.json(data?[data]: []);
}
