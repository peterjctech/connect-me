import dayjs from "dayjs";
import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const CommentModelSlice = [
    {
        id: { type: String, default: uuidv4() },
        author_id: { type: Types.ObjectId, required: true, ref: "User" },
        content: { type: String, required: true },
        likes: [{ type: Types.ObjectId, ref: "User" }],
        created_timestamp: { type: Number, default: dayjs().unix() },
        is_edited: { type: Boolean, default: false },
    },
];

export const reactionEnum = ["Like", "Love", "Sad", "Wow", "Angry"];

export const visibilityEnum = ["Nobody", "Friends Only", "Everyone"];

export const colorEnum = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "magenta", "pink", "white"];
