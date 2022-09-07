import { ColorThemes, MainThemes, Reaction, Visibility, Color } from "@types";
import dayjs from "dayjs";
import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const CommentModelSlice = [
    {
        id: { type: String, default: uuidv4() },
        author: { type: Types.ObjectId, required: true, ref: "User" },
        content: { type: String, required: true },
        likes: [{ type: Types.ObjectId, ref: "User" }],
        created_timestamp: { type: Number, default: dayjs().unix() },
        is_edited: { type: Boolean, default: false },
    },
];

export const reactionEnum: Reaction[] = ["Like", "Love", "Sad", "Wow", "Angry"];

export const visibilityEnum: Visibility[] = ["Nobody", "Friends", "Everyone"];

export const colorEnum: Color[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "purple",
    "magenta",
    "pink",
    "white",
];

export const colorThemeEnum: ColorThemes[] = ["Red", "Green", "Blue", "Purple"];

export const mainThemeEnum: MainThemes[] = ["Light", "Void", "Dark"];
