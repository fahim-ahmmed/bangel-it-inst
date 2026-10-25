import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let clientPromise = null;

export function getClient() {
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!globalThis._bcMongo) {
    globalThis._bcMongo = new MongoClient(uri).connect();
  }
  clientPromise = globalThis._bcMongo;
  return clientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db();
}
