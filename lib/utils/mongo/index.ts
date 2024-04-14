import { MongoClient } from "mongodb";
import { CLIENT_PUBLIC_FILES_PATH } from "next/dist/shared/lib/constants";

const URI = process.env.MONGODB_URI
const option = {}

if(!URI) throw new Error('Please add your Mongo URI')

let client = new MongoClient(URI, option)
let clientPromise

if(process.env.NODE_ENV !== 'production'){
    // @ts-ignore
    if(!global._mongoClientPromise){
        // @ts-ignore
        global._mongoClientPromise = client.connect()
    }
    // @ts-ignore
    clientPromise = global._mongoClientPromise
} else{
    clientPromise = client.connect()
}

export default clientPromise