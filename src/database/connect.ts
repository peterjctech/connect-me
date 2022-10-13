import { connect, connection } from "mongoose";

export const connectDB = async () => {
    console.log("Attempting to connect to database...");
    if (connection.readyState === 0) {
        try {
            await connect(process.env.MONGO_URI!, { user: process.env.MONGO_USER!, pass: process.env.MONGO_PASS });
            console.log("Connected to database...");
        } catch (error) {
            console.log("Failed to connect => ", error);
        }
    } else {
        console.log("Already connected");
    }
};
