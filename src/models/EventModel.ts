import { model, models, Schema } from "mongoose";

import { IEvent } from "@types";
import { eventUserStatusEnum, joinRestrictionEnum, privacyOptionEnum } from "@utils";

import ReactionSchema from "./subModels/ReactionModel";
import CommentSchema from "./subModels/CommentModel";

const ObjectID = Schema.Types.ObjectId;

const EventSchema = new Schema<IEvent>({
    creator: { type: ObjectID, required: true, ref: "User" },
    group: { type: ObjectID, ref: "Group" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    join_restriction: { type: String, required: true, enum: joinRestrictionEnum },
    users: [
        {
            _id: false,
            user: { type: ObjectID, required: true, ref: "User" },
            status: { type: String, required: true, enum: eventUserStatusEnum },
        },
    ],
    reactions: [ReactionSchema],
    comments: [CommentSchema],
    tags: [{ type: ObjectID, ref: "Tag" }],
    created_at: { type: Date, default: new Date() },
    starts_at: { type: Date, required: true },
    ends_at: Date,
    privacy: { type: String, required: true, enum: privacyOptionEnum },
});

export default models.Event || model<IEvent>("Event", EventSchema);
