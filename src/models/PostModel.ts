import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const PostSchema = new Schema({
    author: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    ref_id: {
        type: ObjectId,
        required: true,
        refPath: "ref_model",
    },
    ref_model: {
        type: String,
        required: true,
        enum: ["User", "Group"],
    },
    reactions: [
        {
            _id: {
                type: ObjectId,
                ref: "User",
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
            type: ObjectId,
            ref: "Comment",
        },
    ],
    created_at: {
        type: Number,
        default: dayjs().unix(),
    },
    updated_at: Number,
});

export const PostModel = models.Post || model("Post", PostSchema);
