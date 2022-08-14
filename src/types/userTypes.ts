import { Types } from "mongoose";
import { EventSummary } from "./eventTypes";
import { GroupSummary } from "./groupTypes";
import { InterestSummary } from "./interestTypes";
import { ColorThemes, Visibility } from "./enumTypes";
import { PostSummary } from "./postTypes";
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

export interface FriendSummary {
    id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    mutual_friend_count: number;
    friendship_date: string;
}

export interface UserSummary {
    id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    mutual_friend_count: number;
    is_friend: boolean;
}

export interface UserData {
    id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    join_date: string;
    is_friend: boolean;
    friends: UserSummary[];
    mutual_friend_count: number;
    friend_count?: number;
    groups: GroupSummary[];
    group_count?: number;
    mutual_group_count: number;
    posts?: PostSummary[];
    mutual_interest_count: number;
    interests: InterestSummary[];
    events: EventSummary[];
}

export interface ProfileData {
    id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    join_date: string;
    friends: FriendSummary[];
    friend_count: number;
    groups: GroupSummary[];
    group_count: number;
    posts: PostSummary[];
    interests: InterestSummary[];
    interest_count: number;
    events: EventSummary[];
    event_count: number;
}
