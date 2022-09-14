import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { mainThemeEnum, visibilityEnum, colorThemeEnum, variables } from "@utils";
import { UserModel } from "@types";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_picture: { type: String, default: variables.default.profile },
    join_timestamp: { type: Number, default: dayjs().unix() },
    friends: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            friendship_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    groups: [{ type: Types.ObjectId, ref: "Group" }],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    events: [{ type: Types.ObjectId, ref: "Event" }],
    conversations: [{ type: Types.ObjectId, ref: "Conversation" }],
    notifications: [
        {
            id: { type: String, default: uuidv4() },
            title: { type: String, required: true },
            message: { type: String, required: true },
            ref_id: { type: Types.ObjectId, required: true, refPath: "ref_model" },
            ref_model: { type: String, required: true, enum: ["User", "Group", "Post", "Event"] },
            timestamp: { type: Number, default: dayjs().unix() },
            is_read: { type: Boolean, default: false },
        },
    ],
    preferences: {
        theme: { type: String, default: "Light", enum: mainThemeEnum },
        color: { type: String, default: "Blue", emum: colorThemeEnum },
        visibility: {
            friends: { type: String, default: "Friends", enum: visibilityEnum },
            groups: { type: String, default: "Friends", enum: visibilityEnum },
            events: { type: String, default: "Friends", enum: visibilityEnum },
            posts: { type: String, default: "Friends", enum: visibilityEnum },
        },
    },
});

export const User = models.User || model<UserModel>("User", UserSchema);
