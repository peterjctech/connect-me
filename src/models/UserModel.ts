import { model, models, Schema } from "mongoose";

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
        default: "/default-profile-picture.jpg",
    },
    is_online: {
        type: Boolean,
        default: true,
    },
    join_date: {
        type: Number,
        required: true,
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
                required: true,
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
                required: true,
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
            ref: "Tag",
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
            ref_id: {
                type: ObjectId,
                required: true,
                refPath: "ref_model",
            },
            ref_model: {
                type: String,
                required: true,
                enum: ["User", "Group", "Post", "Comment", "Chat", "Event", "Tag"],
            },
            timestamp: {
                type: Number,
                required: true,
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
                required: true,
            },
        },
    ],
});

export const UserModel = models.User || model("User", UserSchema);
