import { model, models, Schema, Types } from "mongoose";

import { colorEnum } from "@utils";
import { TagModel } from "@types";

const TagSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true, enum: colorEnum },
    user_list: [{ type: Types.ObjectId, ref: "User" }],
    post_list: [{ type: Types.ObjectId, ref: "Post" }],
    event_list: [{ type: Types.ObjectId, ref: "Event" }],
    group_list: [{ type: Types.ObjectId, ref: "Group" }],
});

export const Tag = models.Tag || model<TagModel>("Tag", TagSchema);
