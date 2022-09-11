import { Types } from "mongoose";
import { Reaction } from "./enumTypes";
import { UserModel } from "./userTypes";

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
    author: Types.ObjectId;
    content: string;
    likes: Types.ObjectId[];
    created_timestamp: number;
    is_edited: boolean;
}

export interface Comment {
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

export interface CommentBase {
    id: string;
    author: UserModel;
    content: string;
    likes: UserModel[];
    created_timestamp: number;
    is_edited: boolean;
}

export interface CommentData {
    user_id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    content: string;
    like_count: number;
    like_list: string[];
    created_at: {
        relative: string;
        absolute: string;
    };
}

export interface ReactionData {
    user_id: Types.ObjectId;
    full_name: string;
    reaction: Reaction;
    is_friend: boolean;
}

export interface Message {
    message: string;
}
