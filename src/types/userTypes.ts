import { Types } from "mongoose";
import { ColorThemes, Visibility, MainThemes } from "./enumTypes";
import { Notification } from "./miscTypes";

export interface RegisterUserProps {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface VisibilityPreferences {
    friends: Visibility;
    groups: Visibility;
    events: Visibility;
    interests: Visibility;
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

export interface MySettings {
    username: string;
    first_name: string;
    last_name: string;
    theme: MainThemes;
    color: ColorThemes;
    friend_visibility: Visibility;
    group_visibility: Visibility;
    post_visibility: Visibility;
    interest_visibility: Visibility;
    event_visibility: Visibility;
}
