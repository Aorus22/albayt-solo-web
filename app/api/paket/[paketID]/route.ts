import { NextResponse } from "next/server";
import client from "@/db/db";
import { NextApiRequest} from "next";
const dbName = "albayt-solo";

export async function GET(request: Request, context:any)  {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("paket");

  const { params } = context

  let query = {};
  if (params.paketID === "full") {
    query = {};
  }
  else {
    query = { key: params.paketID };
  }

  const data = await collection.find(query).toArray();

  return NextResponse.json(data);
}
