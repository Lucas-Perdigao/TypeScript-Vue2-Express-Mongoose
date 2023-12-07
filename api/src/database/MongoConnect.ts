import { connection, connect, disconnect } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

export class MongoConnection {
  static initialize() {
    try {
      connection
        .on("error", (error: any) => {
          console.log(`Failed to connect to MongoDB. Error: ${error}`);
        })
        .on("open", () => {
          console.log(`Connected to MongoDB. Welcome!`);
        })
        .on("close", () => {
          console.log("Disconnected from MongoDB.");
        });

      connect(process.env.MONGO_URL as string);
    } catch (error) {
      console.log(`Failed to connect to MongoDB. Error: ${error}`);
    }
  }

  static finish() {
    connection.close();
  }
}
