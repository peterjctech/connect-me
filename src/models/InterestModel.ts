import { model, models, Schema, Types } from "mongoose";
import { colorEnum } from "./modelUtils";

const InterestSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true, enum: colorEnum },
    user_list: [{ type: Types.ObjectId, ref: "User" }],
    group_list: [{ type: Types.ObjectId, ref: "Group" }],
});

export const Interest = models.Interest || model("Interest", InterestSchema);
