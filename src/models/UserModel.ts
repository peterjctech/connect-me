import { Schema, models, model } from "mongoose";
import { IUser } from "@types";
import { groupUserStatusEnum, privacyOptionEnum, eventUserStatusEnum, mainThemeEnum, colorThemeEnum } from "@utils";

import NotificationSchema from "./subModels/NotificationModel";

const ObjectID = Schema.Types.ObjectId;

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_picture: { type: String, default: "/default-user-picture.jpg" },
    joined_at: { type: Date, default: new Date() },
    friends: [
        {
            _id: false,
            user: { type: ObjectID, required: true, ref: "User" },
            friended_at: { type: Date, default: new Date() },
        },
    ],
    posts: [{ type: ObjectID, ref: "Post" }],
    groups: [
        {
            _id: false,
            group: { type: ObjectID, ref: "Group", required: true },
            status: { type: String, required: true, enum: groupUserStatusEnum },
        },
    ],
    events: [
        {
            _id: false,
            event: { type: ObjectID, ref: "Event", required: true },
            status: { type: String, required: true, enum: eventUserStatusEnum },
        },
    ],
    tags: [{ type: ObjectID, ref: "Tag" }],
    chats: [{ type: ObjectID, ref: "Chat" }],
    notifications: [NotificationSchema],
    activity: [
        {
            _id: false,
            ref_id: { type: ObjectID, required: true, refPath: "ref_model" },
            ref_model: { type: String, required: true, enum: ["User", "Post", "Event", "Group", "Tag"] },
            message: { type: String, required: true },
            date: { type: Date, default: new Date() },
        },
    ],
    settings: {
        theme: { type: String, default: "Light", enum: mainThemeEnum },
        color: { type: String, default: "Blue", enum: colorThemeEnum },
        hide_friends: { type: String, default: "Associates", enum: privacyOptionEnum },
        hide_posts: { type: String, default: "Associates", enum: privacyOptionEnum },
        hide_groups: { type: String, default: "Associates", enum: privacyOptionEnum },
        hide_events: { type: String, default: "Associates", enum: privacyOptionEnum },
    },
});

export default models.User || model<IUser>("User", UserSchema);
