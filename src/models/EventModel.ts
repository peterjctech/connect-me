import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { joinRestrictionEnum, eventStatusEnum, reactionEnum } from "@utils";
import { v4 as uuidv4 } from "uuid";
import { EventModel } from "@types";

const EventSchema = new Schema({
    name: { type: String, required: true },
    creator: { type: Types.ObjectId, required: true, ref: "User" },
    group: { type: Types.ObjectId, ref: "Group" },
    join_restriction: { type: String, required: true, enum: joinRestrictionEnum },
    description: { type: String, required: true },
    users: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            status: { type: String, enum: eventStatusEnum, required: true },
            join_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    reactions: [
        {
            user: { type: Types.ObjectId, required: true, ref: "User" },
            reaction: { type: String, required: true, enum: reactionEnum },
            reaction_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    comments: [
        {
            id: { type: String, default: uuidv4() },
            author: { type: Types.ObjectId, required: true, ref: "User" },
            content: { type: String, required: true },
            likes: [{ type: Types.ObjectId, ref: "User" }],
            created_timestamp: { type: Number, default: dayjs().unix() },
            is_edited: { type: Boolean, default: false },
        },
    ],
    timestamp: {
        start: { type: Number, required: true },
        end: Number,
        created: { type: Number, default: dayjs().unix() },
    },
});

export const Event = models.Event || model<EventModel>("Event", EventSchema);
