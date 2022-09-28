import { model, models, Schema } from "mongoose";

import { IGroup } from "@types";
import { groupUserStatusEnum, joinRestrictionEnum } from "@utils";

import ReactionSchema from "./subModels/ReactionModel";

const ObjectID = Schema.Types.ObjectId;

const GroupSchema = new Schema<IGroup>({
    founder: { type: ObjectID, required: true, ref: "User" },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    group_image: { type: String, default: "/default-group-picture.jpg" },
    users: [
        {
            _id: false,
            user: { type: ObjectID, required: true, ref: "User" },
            status: { type: String, required: true, enum: groupUserStatusEnum },
            is_member: { type: Boolean, required: true },
            joined_at: Date,
        },
    ],
    tags: [{ type: ObjectID, ref: "Tag" }],
    events: [{ type: ObjectID, ref: "Event" }],
    posts: [{ type: ObjectID, ref: "Post" }],
    created_at: { type: Date, default: new Date() },
    update_history: [
        {
            _id: false,
            user: { type: ObjectID, required: true, ref: "User" },
            update_message: { type: String, required: true },
            update_image: String,
            updated_at: { type: Date, default: new Date() },
            reactions: [ReactionSchema],
        },
    ],
    settings: {
        join_restriction: { type: String, required: true, enum: joinRestrictionEnum },
        hide_events: { type: Boolean, required: true },
        hide_posts: { type: Boolean, required: true },
    },
});

export default models.Group || model<IGroup>("Group", GroupSchema);
