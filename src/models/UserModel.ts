import { model, models, Schema } from "mongoose";
import { UserModel } from "types";

const UserSchema = new Schema<UserModel>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

export default models.User || model<UserModel>("User", UserSchema);
