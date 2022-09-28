import { Schema, models, model } from "mongoose";
import { IChat } from "@types";

const ObjectID = Schema.Types.ObjectId;

const ChatSchema = new Schema<IChat>({
    title: String,
    members: [
        {
            _id: false,
            user: { type: ObjectID, required: true, ref: "User" },
            last_read: { type: Date, default: new Date() },
        },
    ],
    messages: [
        {
            _id: false,
            user: { type: ObjectID, required: true, ref: "User" },
            content: { type: String, required: true },
            sent_at: { type: Date, default: new Date() },
        },
    ],
});

export default models.Chat || model<IChat>("Chat", ChatSchema);
