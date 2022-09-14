import { variables } from "@utils";
import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { joinRestrictionEnum, groupStatusEnum } from "@utils";
import { GroupModel } from "@types";

const GroupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    group_image: { type: String, default: variables.default.group },
    join_restriction: { type: String, required: true, enum: joinRestrictionEnum },
    users: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            status: { type: String, enum: groupStatusEnum, required: true },
            join_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    events: [{ type: Types.ObjectId, ref: "Event" }],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    created_timestamp: { type: Number, default: dayjs().unix() },
    update_history: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            update: { type: String, required: true },
            timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
});

export const Group = models.Group || model<GroupModel>("Group", GroupSchema);
