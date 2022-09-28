import { model, models, Schema } from "mongoose";

import { ITag } from "@types";
import { colorEnum } from "@utils";

const ObjectID = Schema.Types.ObjectId;

const TagSchema = new Schema<ITag>({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true, enum: colorEnum },
    users: [{ type: ObjectID, ref: "User" }],
    posts: [{ type: ObjectID, ref: "Post" }],
    groups: [{ type: ObjectID, ref: "Group" }],
    events: [{ type: ObjectID, ref: "Event" }],
});

export default models.Tag || model<ITag>("Tag", TagSchema);
