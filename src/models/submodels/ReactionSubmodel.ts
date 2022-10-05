import { Schema } from "mongoose";
import { ReactionSubmodel } from "types";
import { reactionEnum } from "utils";

const ObjectID = Schema.Types.ObjectId;

const ReactionSchema = new Schema<ReactionSubmodel>(
    {
        user_id: { type: ObjectID, required: true, ref: "User" },
        reaction: { type: String, required: true, enum: reactionEnum },
    },
    { _id: false }
);

export default ReactionSchema;
