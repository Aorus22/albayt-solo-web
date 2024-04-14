import { MongoClient } from "mongodb";
import { CLIENT_PUBLIC_FILES_PATH } from "next/dist/shared/lib/constants";

const URI = process.env.MONGODB_URI
const option = {}

if(!URI) throw new Error('Please add your Mongo URI')

let client = new MongoClient(URI, option)
let clientPromise

if(process.env.NODE_ENV !== 'production'){
    if(!global._mongoClientPromise){
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
} else{
    clientPromise = client.connect()
}

export default clientPromise