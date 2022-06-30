import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
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
        type: String,
        default: "@assets/images/default-profile-picture.jpg",
    },
    is_online: {
        type: Boolean,
        default: true,
    },
    join_date: {
        type: Number,
        default: dayjs().unix(),
    },
    friends: [
        {
            _id: {
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
            _id: {
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
        },
    ],
    posts: [
        {
            type: ObjectId,
            ref: "Post",
        },
    ],
    tags: [
        {
            type: ObjectId,
            ref: "Tags",
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
    chat_notifs: [
        {
            _id: {
                type: ObjectId,
                ref: "Chat",
            },
            message: String,
            timestamp: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
});

export const UserModel = models.User || model("User", UserSchema);
