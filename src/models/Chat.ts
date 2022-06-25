import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const ChatSchema = new Schema({
    chat_id: ObjectId,
    chat_name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            user_id: {
                type: ObjectId,
                ref: "User",
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
});

export const Chat = models.Chat || model("Chat", ChatSchema);
