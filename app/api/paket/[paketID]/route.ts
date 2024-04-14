import { NextResponse } from "next/server";
import { getPaket } from "@/db/db";
import { NextApiRequest} from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
const dbName = "albayt-solo";

export async function GET(request: Request, context: { params: any })  {
  const data = await getPaket(context.params?.paketID)

  return NextResponse.json(data?[data]: []);
}
