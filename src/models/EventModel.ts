import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { reactionEnum, CommentModelSlice } from "./modelUtils";

const EventSchema = new Schema({
    name: { type: String, required: true },
    creator: { type: Types.ObjectId, required: true, ref: "User" },
    group: { type: Types.ObjectId, required: true, ref: "Group" },
    description: { type: String, required: true },
    users: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            status: { type: String, enum: ["Yes", "No", "Maybe"], required: true },
            join_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    reactions: [
        {
            user: { type: Types.ObjectId, required: true, ref: "User" },
            reaction: { type: String, required: true, enum: reactionEnum },
            reaction_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    comments: CommentModelSlice,
    start_timestamp: { type: Number, required: true },
    end_timestamp: Number,
    created_timestamp: { type: Number, default: dayjs().unix() },
});

export const Event = models.Event || model("Event", EventSchema);
