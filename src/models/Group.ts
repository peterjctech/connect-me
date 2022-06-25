import { model, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const GroupSchema = new Schema({
    group_id: ObjectId,
    group_name: {
        type: String,
        required: true,
    },
    description: String,
    group_image: {
        type: String,
        default: "@assets/images/default-group-image.jpg",
    },
    visibility: {
        type: String,
        default: "Invite",
    },
    location: String,
    users: [
        {
            user_id: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            is_admin: {
                type: Boolean,
                default: false,
            },
            availability: [
                {
                    year: Number,
                    day_of_year: Number,
                    time: String,
                },
            ],
            join_date: {
                type: Number,
                default: dayjs().unix(),
            },
        },
    ],
    meetups: [
        {
            type: ObjectId,
            ref: "Meetup",
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
            ref: "Interest",
        },
    ],
    created_at: {
        type: Number,
        default: dayjs().unix(),
    },
});

export const Group = model("Group", GroupSchema);
