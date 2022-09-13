import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { reactionEnum } from "@utils";
import { v4 as uuidv4 } from "uuid";

const PostSchema = new Schema({
    author: { type: Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    picture: String,
    group: { type: Types.ObjectId, ref: "Group" },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    reactions: [
        {
            user: { type: Types.ObjectId, required: true, ref: "User" },
            reaction: { type: String, required: true, enum: reactionEnum },
            reaction_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    comments: [
        {
            id: { type: String, default: uuidv4() },
            author: { type: Types.ObjectId, required: true, ref: "User" },
            content: { type: String, required: true },
            likes: [{ type: Types.ObjectId, ref: "User" }],
            created_timestamp: { type: Number, default: dayjs().unix() },
            is_edited: { type: Boolean, default: false },
        },
    ],
    created_timestamp: { type: Number, default: dayjs().unix() },
    is_edited: { type: Boolean, default: false },
});

export const Post = models.Post || model("Post", PostSchema);
