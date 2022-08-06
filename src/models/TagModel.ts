import { model, models, Schema, SchemaTypes } from "mongoose";

const ObjectId = SchemaTypes.ObjectId;

const TagSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "black",
    },
    user_list: [
        {
            type: ObjectId,
            ref: "User",
        },
    ],
    group_list: [
        {
            type: ObjectId,
            ref: "Group",
        },
    ],
});

export const TagModel = models.Tag || model("Tag", TagSchema);
