import { model, models, Schema } from "mongoose";

import { EventModel } from "types";
import { eventMemberStatusEnum, eventRestrictionEnum, changeEnum } from "utils";

import ReactionSubschema from "./submodels/ReactionSubmodel";
import CommentSubschema from "./submodels/CommentSubmodel";

const ObjectID = Schema.Types.ObjectId;

const EventSchema = new Schema<EventModel>({
    ref_id: { type: ObjectID, required: true, refPath: "ref_model" },
    ref_model: { type: String, required: true, enum: ["Group", "User"] },
    name: { type: String, required: true },
    description: { type: String, required: true },
    users: [
        {
            _id: false,
            user_id: { type: ObjectID, ref: "User", required: true },
            status: { type: String, required: true, enum: eventMemberStatusEnum },
        },
    ],
    tags: [{ type: ObjectID, ref: "Tag" }],
    reactions: [ReactionSubschema],
    comments: [CommentSubschema],
    created_at: { type: Date, default: new Date() },
    starts_at: { type: Date, required: true },
    ends_at: Date,
    last_change: {
        user_id: { type: ObjectID, required: true, ref: "User" },
        change: { type: String, required: true, enum: changeEnum },
        changed_at: { type: Date, default: new Date() },
    },
    restriction: { type: String, required: true, enum: eventRestrictionEnum },
});

export default models.Event || model<EventModel>("Event", EventSchema);
