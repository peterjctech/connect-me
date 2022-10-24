import bcrypt from "bcrypt";
import { Schema, models, model } from "mongoose";
import { UserModel } from "types";
import { mainThemeEnum, colorThemeEnum, privacyOptionEnum, friendStatusEnum } from "utils";
import NotificationSubschema from "./submodels/NotificationSubmodel";

const ObjectID = Schema.Types.ObjectId;

const UserSchema = new Schema<UserModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_picture: { type: String, default: "/default-user-picture.jpg" },
    birthday: { type: Date, required: true },
    intro: String,
    joined_at: { type: Date, default: () => new Date() },
    friends: [
        {
            _id: false,
            user_id: { type: ObjectID, ref: "User", required: true },
            status: { type: String, required: true, enum: friendStatusEnum },
        },
    ],
    tags: [{ type: ObjectID, ref: "Tag" }],
    groups: [{ type: ObjectID, ref: "Groups" }],
    events: [{ type: ObjectID, ref: "Event" }],
    chats: [{ type: ObjectID, ref: "Chat" }],
    notifications: [NotificationSubschema],
    settings: {
        theme: { type: String, default: "Light", enum: mainThemeEnum },
        color: { type: String, default: "Blue", enum: colorThemeEnum },
        default_post_is_public: { type: Boolean, default: true },
        friend_privacy: { type: String, default: "Everyone", enum: privacyOptionEnum },
        group_privacy: { type: String, default: "FriendsOnly", enum: privacyOptionEnum },
        event_privacy: { type: String, default: "ShowMutual", enum: privacyOptionEnum },
    },
});

UserSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export default models.User || model<UserModel>("User", UserSchema);
