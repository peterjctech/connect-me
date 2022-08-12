import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { reactionEnum, CommentModelSlice } from "@utils";

const EventSchema = new Schema({
    event: { type: String, required: true },
    creator_id: { type: Types.ObjectId, required: true, ref: "User" },
    group_id: { type: Types.ObjectId, required: true, ref: "Group" },
    description: { type: String, required: true },
    members: [
        {
            user_id: { type: Types.ObjectId, required: true, ref: "User" },
            status: ["Yes", "Maybe", "No", "Unresponsive"],
        },
    ],
    reactions: [
        {
            user_id: { type: Types.ObjectId, required: true, ref: "User" },
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
