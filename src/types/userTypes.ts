import { Types } from "mongoose";
import { SinglePost } from "./postTypes";
import { InterestSummary } from "./interestTypes";
import { ColorThemes, EventMemberStatus, GroupStatus, Notification, Visibility } from "./miscTypes";
import { GroupSummary } from "./groupTypes";
import { EventSummary } from "./eventTypes";

export interface CreateUserProps {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
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
    id: string;
    full_name: string;
    profile_picture: string;
}

export interface SingleUser {
    id: string;
    full_name: string;
    profile_picture: string;
    join_date: string;
    mutual_friends: UserSummary[];
    mutual_friend_count: number;
    friends?: UserSummary[];
    friend_count?: number;
    groups?: GroupSummary[];
    posts?: SinglePost[];
    interests?: InterestSummary[];
    events?: EventSummary[];
}
