import { model, models, Schema, SchemaTypes } from "mongoose";

const ObjectId = SchemaTypes.ObjectId;

const InterestSchema = new Schema({
    interest_id: ObjectId,
    interest: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "black",
    },
});

export const Interest = models.Interest || model("Interest", InterestSchema);
