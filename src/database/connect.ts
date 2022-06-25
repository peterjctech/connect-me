import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.MONGO_URI || "");
        try {
            console.log("Connected to database...");
        } catch (error) {
            console.log("Failed to connect => ", error);
        }
    } else {
        console.log("Already connected");
    }
};
