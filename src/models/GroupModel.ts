import { model, models, Schema } from "mongoose";

import { GroupModel } from "types";
import { groupMemberStatusEnum, groupRestrictionEnum, groupUserStatusEnum } from "utils";

import ReactionSubschema from "./submodels/ReactionSubmodel";

const ObjectID = Schema.Types.ObjectId;

const GroupSchema = new Schema<GroupModel>({
    owner_id: { type: ObjectID, required: true, ref: "User" },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    group_image: { type: String, default: "/default-group-picture.jpg" },
    members: [
        {
            _id: false,
            user_id: { type: ObjectID, required: true, ref: "User" },
            status: { type: String, required: true, enum: groupMemberStatusEnum },
        },
    ],
    other_users: [
        {
            _id: false,
            user_id: { type: ObjectID, required: true, ref: "User" },
            status: { type: String, required: true, enum: groupUserStatusEnum },
        },
    ],
    meta_activity: [
        {
            _id: false,
            updater_id: { type: ObjectID, required: true, ref: "User" },
            change_message: { type: String, required: true },
            new_owner: { type: ObjectID, ref: "User" },
            new_description: String,
            new_image: String,
            date: { type: Date, default: () => new Date() },
            reactions: [ReactionSubschema],
        },
    ],
    user_activity: [
        {
            _id: false,
            user_id: { type: ObjectID, required: true, ref: "User" },
            message: { type: String, required: true },
            date: { type: Date, default: () => new Date() },
        },
    ],
    tags: [{ type: ObjectID, ref: "Tag" }],
    created_at: { type: Date, default: () => new Date() },
    restriction: { type: String, required: true, enum: groupRestrictionEnum },
});

export default models.Group || model<GroupModel>("Group", GroupSchema);
