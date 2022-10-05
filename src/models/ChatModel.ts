import { Schema, models, model } from "mongoose";
import { ChatModel } from "types";
import ChatMessageSubSchema from "./submodels/ChatMessageSubmodel";

const ObjectID = Schema.Types.ObjectId;

const ChatSchema = new Schema<ChatModel>({
    title: { type: String, required: true },
    members: [
        {
            _id: false,
            user_id: { type: ObjectID, required: true, ref: "User" },
            is_read: { type: Boolean, default: false },
        },
    ],
    messages: [ChatMessageSubSchema],
    activity: [
        {
            _id: false,
            message: { type: String, required: true },
            date: { type: Date, default: new Date() },
        },
    ],
});

export default models.Chat || model<ChatModel>("Chat", ChatSchema);
