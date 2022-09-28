import { model, models, Schema } from "mongoose";

import { IPost } from "@types";
import { privacyOptionEnum } from "@utils";

import ReactionSchema from "./subModels/ReactionModel";
import CommentSchema from "./subModels/CommentModel";

const ObjectID = Schema.Types.ObjectId;

const PostSchema = new Schema<IPost>({
    author: { type: ObjectID, required: true, ref: "User" },
    group: { type: ObjectID, ref: "Group" },
    content: { type: String, required: true },
    picture: String,
    tags: [{ type: ObjectID, ref: "Tag" }],
    reactions: [ReactionSchema],
    comments: [CommentSchema],
    created_at: { type: Date, default: new Date() },
    is_edited: { type: Boolean, default: false },
    privacy: { type: String, required: true, enum: privacyOptionEnum },
});

export default models.Post || model<IPost>("Post", PostSchema);
