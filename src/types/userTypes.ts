import { Types } from "mongoose";
import { ColorThemes, Visibility } from "./enumTypes";
import { Notification } from "./miscTypes";

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
        theme: ColorThemes;
        visibility: VisibilityPreferences;
    };
}

export interface BaseProfileData {
    join_date: string;
    friend_count: number;
    friends_preview: {
        user_id: Types.ObjectId;
        full_name: string;
        profile_picture: string;
    }[];
    group_count: number;
    event_count: number;
    interest_count: number;
}
