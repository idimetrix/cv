import { MongoClient } from "mongodb";

declare global {
  var connection: Promise<MongoClient>;
}

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global.connection) {
    client = new MongoClient(process.env.MONGODB_URI as string, {});
    global.connection = client.connect();
  }
  clientPromise = global.connection;
} else {
  client = new MongoClient(process.env.MONGODB_URI as string, {});
  clientPromise = client.connect();
}

export default clientPromise;
