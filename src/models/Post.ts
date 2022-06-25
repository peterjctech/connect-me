import { model, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const PostSchema = new Schema({
    post_id: ObjectId,
    post: {
        type: String,
        required: true,
    },
    reactions: [
        {
            user_id: {
                type: ObjectId,
                required: true,
            },
            reaction: {
                type: String,
                required: true,
            },
        },
    ],
    comments: [
        {
            user_id: {
                type: ObjectId,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            created_at: {
                type: Number,
                default: dayjs().unix(),
            },
            updated_at: Number,
        },
    ],
    tags: [
        {
            type: ObjectId,
            ref: "Interest",
        },
    ],
    created_at: {
        type: Number,
        default: dayjs().unix(),
    },
    updated_at: Number,
});

export const Post = model("Post", PostSchema);
