import { model, models, Schema } from "mongoose";

import { PostModel } from "types";
import { changeEnum } from "utils";

import ReactionSubschema from "./submodels/ReactionSubmodel";
import CommentSubschema from "./submodels/CommentSubmodel";

const ObjectID = Schema.Types.ObjectId;

const PostSchema = new Schema<PostModel>({
    author_id: { type: ObjectID, required: true, ref: "User" },
    group_id: { type: ObjectID, ref: "Group" },
    content: { type: String, required: true },
    media: String,
    tags: [{ type: ObjectID, ref: "Tag" }],
    reactions: [ReactionSubschema],
    comments: [CommentSubschema],
    created_at: { type: Date, default: () => new Date() },
    last_change: {
        user_id: { type: ObjectID, required: true, ref: "User" },
        change: { type: String, required: true, enum: changeEnum },
        changed_at: { type: Date, default: () => new Date() },
    },
    is_edited: { type: Boolean, default: false },
    is_public: { type: Boolean, required: true },
});

export default models.Post || model<PostModel>("Post", PostSchema);
