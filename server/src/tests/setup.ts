import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

export const connectTestDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
};

export const disconnectTestDB = async () => {
  await mongoose.disconnect();
  await mongo.stop();
};

export const clearTestDB = async () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB não está conectado.");
  }

  const collections = await db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
};
