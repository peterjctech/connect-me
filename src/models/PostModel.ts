import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { reactionEnum, CommentModelSlice } from "./modelUtils";

const PostSchema = new Schema({
    author: { type: Types.ObjectId, required: true, ref: "User" },
    content: String,
    picture: String,
    reactions: [
        {
            user: { type: Types.ObjectId, required: true, ref: "User" },
            reaction: { type: String, required: true, enum: reactionEnum },
            reaction_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    comments: CommentModelSlice,
    created_timestamp: { type: Number, default: dayjs().unix() },
    is_edited: { type: Boolean, default: false },
});

export const Post = models.Post || model("Post", PostSchema);
