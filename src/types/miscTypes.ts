import { Types } from "mongoose";

export interface Notification {
    id: string;
    title: string;
    message: string;
    ref_id: Types.ObjectId;
    ref_model: "User" | "Group" | "Post" | "Event" | "Comment";
    timestamp: number;
    is_read: boolean;
}

export interface CommentModel {
    id: string;
    author_id: Types.ObjectId;
    content: string;
    likes: Types.ObjectId[];
    created_timestamp: number;
    is_edited: boolean;
}

export interface SingleComment {
    author: {
        id: Types.ObjectId;
        full_name: string;
        profile_picture: string;
    };
    content: string;
    like_count: number;
    time_summary: string;
    created_at: string;
    is_edited: boolean;
}

export interface ReactionData {
    user_id: Types.ObjectId;
    full_name: string;
    reaction: Reaction;
    is_friend: boolean;
}

export type Colors = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "magenta" | "pink" | "white";

export type GroupStatus = "Admin" | "Member" | "Pending";

export type Reaction = "Like" | "Love" | "Sad" | "Wow" | "Angry";

export type ColorThemes = "Light" | "Dark";

export type EventMemberStatus = "Yes" | "Maybe" | "No" | "Unresponsive";

export type Visibility = "Nobody" | "Friends Only" | "Everyone";

export type JoinRestriction = "Private" | "Invite" | "Open" | "Friends";
