import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const ChatSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    members: [
        {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    ],
    messages: [
        {
            _id: {
                type: ObjectId,
                ref: "User",
            },
            content: {
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
