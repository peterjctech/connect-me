import { Schema } from "mongoose";
import { ChatMessageSubmodel } from "types";

const ObjectID = Schema.Types.ObjectId;

const ChatMessageSubschema = new Schema<ChatMessageSubmodel>({
    sender: { type: ObjectID, required: true, ref: "User" },
    content: { type: String, required: true },
    sent_at: { type: Date, default: new Date() },
});

export default ChatMessageSubschema;
