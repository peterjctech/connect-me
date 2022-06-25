import { model, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const EventSchema = new Schema({
    event_id: ObjectId,
    event: {
        type: String,
        required: true,
    },
    description: String,
    users: [
        {
            user_id: {
                type: ObjectId,
                ref: "User",
            },
            is_confirmed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    posts: [
        {
            type: ObjectId,
            ref: "Post",
        },
    ],
    starts_at: {
        type: Number,
        required: true,
    },
    ends_at: Number,
    created_at: {
        type: Number,
        default: dayjs().unix(),
    },
});

export const Event = model("Event", EventSchema);
