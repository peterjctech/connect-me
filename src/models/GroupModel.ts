import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";

const GroupSchema = new Schema({
    group: { type: String, required: true },
    founder: { type: Types.ObjectId, required: true, ref: "User" },
    description: { type: String, required: true },
    group_image: { type: String, required: true },
    join_restriction: { type: String, required: true, enum: ["Private", "Invite", "Open", "Friends"] },
    admins: [{ type: Types.ObjectId, ref: "User" }],
    members: [{ type: Types.ObjectId, ref: "User" }],
    join_requests: [{ type: Types.ObjectId, ref: "User" }],
    banned_users: [{ type: Types.ObjectId, ref: "User" }],
    interests: [{ type: Types.ObjectId, ref: "Interest" }],
    events: [{ type: Types.ObjectId, ref: "Event" }],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    created_timestamp: { type: Number, default: dayjs().unix() },
    update_history: [
        {
            user_id: { type: Types.ObjectId, ref: "User", required: true },
            update: { type: String, required: true },
            timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
});

export const Group = models.Group || model("Group", GroupSchema);
