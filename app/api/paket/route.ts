import { getPakets } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getPakets(), {
    headers: {
      "Cache-Control": "no-cache"
    }
  })
}