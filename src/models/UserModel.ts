import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { visibilityEnum } from "@utils";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_picture: { type: String, default: "/default-profile-picture.jpg" },
    join_timestamp: { type: Number, default: dayjs().unix() },
    friends: [
        {
            user_id: { type: Types.ObjectId, ref: "User", required: true },
            friendship_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    groups: [
        {
            group_id: { type: Types.ObjectId, ref: "Group", required: true },
            join_timestamp: { type: Number, default: dayjs().unix() },
            status: { type: String, required: true, enum: ["Admin", "Member", "Pending"] },
        },
    ],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    interests: [
        {
            interest_id: { type: Types.ObjectId, required: true, ref: "Interest" },
            added_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    events: [
        {
            event_id: { type: Types.ObjectId, required: true, ref: "Event" },
            join_timestamp: { type: Number, default: dayjs().unix() },
            status: { type: String, default: "Unresponsive", enum: ["Yes", "Maybe", "No", "Unresponsive"] },
        },
    ],
    conversations: [
        {
            conversation_id: { type: Types.ObjectId, required: true, ref: "Conversation" },
            is_read: { type: Boolean, default: false },
        },
    ],
    notifications: [
        {
            id: { type: String, default: uuidv4() },
            title: { type: String, required: true },
            message: { type: String, required: true },
            ref_id: { type: Types.ObjectId, required: true, refPath: "ref_model" },
            ref_model: { type: String, required: true, enum: ["User", "Group", "Post", "Event", "Comment"] },
            timestamp: { type: Number, default: dayjs().unix() },
            is_read: { type: Boolean, default: false },
        },
    ],
    preferences: {
        theme: { type: String, default: "Light", enum: ["Light", "Dark"] },
        visibility: {
            friends: { type: String, default: "Friends Only", enum: visibilityEnum },
            groups: { type: String, default: "Friends Only", enum: visibilityEnum },
            events: { type: String, default: "Friends Only", enum: visibilityEnum },
            interests: { type: String, default: "Friends Only", enum: visibilityEnum },
            posts: { type: String, default: "Friends Only", enum: visibilityEnum },
        },
    },
});

export const User = models.User || model("User", UserSchema);
