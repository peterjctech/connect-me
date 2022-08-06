import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    founder: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    description: String,
    group_image: {
        type: String,
        default: "/default-group-image.jpg",
    },
    visibility: {
        type: String,
        default: "Invite",
    },
    members: [
        {
            _id: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            is_admin: {
                type: Boolean,
                default: false,
            },
            join_date: {
                type: Number,
                default: dayjs().unix(),
            },
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
    posts: [
        {
            type: ObjectId,
            ref: "Post",
        },
    ],
    created_at: {
        type: Number,
        default: dayjs().unix(),
    },
});

export const GroupModel = models.Group || model("Group", GroupSchema);
