import { Schema, models, model } from "mongoose";
import { FriendshipModel } from "types";

const ObjectID = Schema.Types.ObjectId;

const FriendshipSchema = new Schema<FriendshipModel>({
    sender: { type: ObjectID, ref: "User" },
    reciever: { type: ObjectID, ref: "User" },
    is_accepted: { type: Boolean, default: false },
});

export default models.Friendship || model<FriendshipModel>("Friendship", FriendshipSchema);
