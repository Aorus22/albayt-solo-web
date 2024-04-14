import { NextResponse } from "next/server";
import client from "@/db/db";

const dbName = 'b';

export async function GET() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const a = await  collection.find({
    user_id: "a"
  }).toArray()

  // the following code examples can be pasted here...
  console.log(a)
  return NextResponse.json(a)
}