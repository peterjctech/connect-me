import { Types } from "mongoose";
import { MainThemes, ColorThemes, VisibilityPreference } from "./enumTypes";
import { ListAndCount } from "./helperTypes";
import { PostData } from "./postTypes";

// Main
export interface UserModel {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    join_timestamp: number;
    friends: Friend[];
    groups: Types.ObjectId[];
    posts: Types.ObjectId[];
    tags: Types.ObjectId[];
    events: Types.ObjectId[];
    conversations: Types.ObjectId[];
    notifications: Notification[];
    settings: {
        theme: MainThemes;
        color: ColorThemes;
        visibility: UserVisibility;
    };
}
export interface UserModalList {
    user_id: string;
    full_name: string;
    profile_picture: string;
    mutual_friends?: ListAndCount;
    is_friend: boolean;
}
export interface UserSummary {
    user_id: string;
    full_name: string;
    profile_picture: string;
    mutual_friends?: ListAndCount;
}
export interface UserData {
    user_id: string;
    full_name: string;
    profile_picture: string;
    join_date: string;
    mutual_friends?: ListAndCount;
    friendship_date?: string;
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
export interface UpdateUserSettingsProps {
    username: string;
    first_name: string;
    last_name: string;
    theme: MainThemes;
    color: ColorThemes;
    friend_visibility: VisibilityPreference;
    group_visibility: VisibilityPreference;
    post_visibility: VisibilityPreference;
    event_visibility: VisibilityPreference;
    new_password: string;
    confirm_new_password: string;
    old_password: string;
}

// Helpers
export interface UserVisibility {
    friends: VisibilityPreference;
    groups: VisibilityPreference;
    events: VisibilityPreference;
    posts: VisibilityPreference;
}
export interface Friend {
    user: Types.ObjectId;
    friendship_timestamp: number;
}

// Queries
export interface GetUserSummaryArgs {
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    profile_picture: string;
    friends: {
        user: {
            _id: Types.ObjectId;
            first_name: string;
            last_name: string;
        };
    }[];
    preferences: {
        visibility: {
            friends: VisibilityPreference;
        };
    };
}

export interface GetUserSummaryArgs2 {
    _id: Types.ObjectId;
    friends: {
        user: Types.ObjectId;
    }[];
}
export interface GetUserDataArgs extends GetUserSummaryArgs {
    join_timestamp: number;
}
