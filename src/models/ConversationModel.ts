import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";

const ConversationSchema = new Schema({
    title: { type: String, required: true },
    members: [
        {
            user: { type: Types.ObjectId, required: true, ref: "User" },
            last_read_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    messages: [
        {
            user: { type: Types.ObjectId, required: true, ref: "User" },
            content: { type: String, required: true },
            timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
});

export const Conversation = models.Conversation || model("Conversation", ConversationSchema);
