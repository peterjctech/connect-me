import { Schema } from "mongoose";
import { IComment } from "@types";

const ObjectID = Schema.Types.ObjectId;

const CommentSchema = new Schema<IComment>({
    author: { type: ObjectID, required: true, ref: "User" },
    content: { type: String, required: true },
    likes: [{ type: ObjectID, ref: "User" }],
    created_at: { type: Date, default: new Date() },
    is_edited: { type: Boolean, default: false },
});

export default CommentSchema;
