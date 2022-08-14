import dayjs from "dayjs";
import { model, models, Schema, Types } from "mongoose";

const GroupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    group_image: { type: String, required: true },
    join_restriction: { type: String, required: true, enum: ["Private", "Invite", "Open", "Friends"] },
    users: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            status: { type: String, enum: ["Founder", "Admin", "Member", "Pending", "Banned"], required: true },
            join_timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
    interests: [{ type: Types.ObjectId, ref: "Interest" }],
    events: [{ type: Types.ObjectId, ref: "Event" }],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    created_timestamp: { type: Number, default: dayjs().unix() },
    update_history: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            update: { type: String, required: true },
            timestamp: { type: Number, default: dayjs().unix() },
        },
    ],
});

export const Group = models.Group || model("Group", GroupSchema);
