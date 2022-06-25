import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const UserSchema = new Schema({
    user_id: ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: String,
    profile_picture: {
        image: {
            type: String,
            default: "@assets/images/default-profile-picture.jpg",
        },
        timestamp: {
            type: Number,
            default: dayjs().unix(),
        },
    },
    is_online: {
        type: Boolean,
        default: true,
    },
    friends: [
        {
            user_id: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            friendship_date: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
    messages: [
        {
            chat_id: {
                type: ObjectId,
                ref: "Chat",
                required: true,
            },
            last_checked: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
    groups: [
        {
            type: ObjectId,
            ref: "Group",
            required: true,
        },
    ],
    posts: [
        {
            type: ObjectId,
            ref: "Post",
        },
    ],
    interests: [
        {
            type: ObjectId,
            ref: "Interests",
        },
    ],
    events: [
        {
            type: ObjectId,
            ref: "Event",
        },
    ],
    notifications: [
        {
            title: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Number,
                default: dayjs().unix(),
            },
            is_read: {
                type: Boolean,
                default: false,
            },
        },
    ],
    friend_requests: [
        {
            user_id: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            timestamp: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
    chat_notifs: [
        {
            user_id: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            chat_id: {
                type: ObjectId,
                ref: "User",
            },
            message: String,
            timestamp: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
});

export const User = models.User || model("User", UserSchema);
