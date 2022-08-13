import { Types } from "mongoose";
import { EventSummary } from "./eventTypes";
import { GroupSummary } from "./groupTypes";
import { InterestSummary } from "./interestTypes";
import { ColorThemes, EventMemberStatus, GroupStatus, Notification, Visibility } from "./miscTypes";
import { PostSummary } from "./postTypes";

export interface UserModel {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    join_timestamp: number;
    friends: {
        user_id: Types.ObjectId;
        friendship_timestamp: number;
    }[];
    groups: {
        group_id: Types.ObjectId;
        join_timestamp: number;
        status: GroupStatus;
    }[];
    posts: Types.ObjectId[];
    interests: {
        interest_id: Types.ObjectId;
        added_timestamp: number;
    }[];
    events: {
        event_id: Types.ObjectId;
        join_timestamp: number;
        status: EventMemberStatus;
    }[];
    conversations: {
        conversation_id: Types.ObjectId;
        is_read: boolean;
    }[];
    notifications: Notification[];
    preferences: {
        theme: ColorThemes;
        visibility: {
            friends: Visibility;
            groups: Visibility;
            events: Visibility;
            interests: Visibility;
            posts: Visibility;
        };
    };
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
    total_friend_count?: number;
    groups: GroupSummary[];
    group_count?: number;
    mutual_group_count: number;
    posts?: PostSummary[];
    mutual_interest_count: number;
    interests?: InterestSummary[];
    events?: EventSummary[];
}

interface FriendSummary {
    id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    mutual_friend_count: number;
    friendship_date: string;
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
