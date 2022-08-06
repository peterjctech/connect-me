import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const CommentSchema = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: "User",
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
        enum: ["Post", "Event"],
    },
    likes: [
        {
            type: ObjectId,
            ref: "User",
        },
    ],
    created_at: {
        type: Number,
        default: dayjs().unix(),
    },
    updated_at: Number,
});

export const Comment = models.Comment || model("Comment", CommentSchema);
