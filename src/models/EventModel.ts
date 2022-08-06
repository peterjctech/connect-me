import { model, models, Schema, SchemaTypes } from "mongoose";
import dayjs from "dayjs";

const ObjectId = SchemaTypes.ObjectId;

const EventSchema = new Schema({
    event: {
        type: String,
        required: true,
    },
    creator: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    group: {
        type: ObjectId,
        ref: "Group",
        required: true,
    },
    description: String,
    attending: [
        {
            _id: {
                type: ObjectId,
                ref: "User",
            },
            is_confirmed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    comments: [
        {
            type: ObjectId,
            ref: "Comment",
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

export const Event = models.Event || model("Event", EventSchema);
