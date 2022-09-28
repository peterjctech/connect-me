import { connect, connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    console.log("Attempting to connect to database...");
    if (connection.readyState === 0) {
        try {
            await connect(process.env.MONGO_URI!);
            console.log("Connected to database...");
        } catch (error) {
            console.log("Failed to connect => ", error);
        }
    } else {
        console.log("Already connected");
    }
};
