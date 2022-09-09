import { Types } from "mongoose";
import { ColorThemes, Visibility, MainThemes } from "./enumTypes";
import { Notification } from "./miscTypes";

export interface VisibilityPreferences {
    friends: Visibility;
    groups: Visibility;
    events: Visibility;
    posts: Visibility;
}

export interface UserModel {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    join_timestamp: number;
    friends: {
        user: Types.ObjectId;
        friendship_timestamp: number;
    }[];
    groups: Types.ObjectId[];
    posts: Types.ObjectId[];
    interests: Types.ObjectId[];
    events: Types.ObjectId[];
    conversations: Types.ObjectId[];
    notifications: Notification[];
    preferences: {
        theme: MainThemes;
        color: ColorThemes;
        visibility: VisibilityPreferences;
    };
}

export interface RegisterUserProps {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUserProps {
    username: string;
    password: string;
}

export interface UserSettingsBase {
    username: string;
    first_name: string;
    last_name: string;
    theme: MainThemes;
    color: ColorThemes;
    friend_visibility: Visibility;
    group_visibility: Visibility;
    post_visibility: Visibility;
    event_visibility: Visibility;
}

export interface UserSettings extends UserSettingsBase {
    password: string;
    confirm_password: string;
}

export interface UpdateUserSettingsProps extends UserSettingsBase {
    new_password: string;
    confirm_new_password: string;
    old_password: string;
}
