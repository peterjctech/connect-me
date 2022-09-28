import { Schema } from "mongoose";
import { IReaction } from "@types";
import { reactionEnum } from "@utils";

const ObjectID = Schema.Types.ObjectId;

const ReactionSchema = new Schema<IReaction>(
    {
        user: { type: ObjectID, required: true, ref: "User" },
        reaction: { type: String, required: true, enum: reactionEnum },
        reacted_at: { type: Date, default: new Date() },
    },
    { _id: false }
);

export default ReactionSchema;
