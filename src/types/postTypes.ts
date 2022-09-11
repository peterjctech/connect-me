import { Types } from "mongoose";
import { CommentBase, CommentData, CommentModel } from "./miscTypes";
import { Reaction } from "./enumTypes";
import { UserModel } from "./userTypes";

export interface PostModel {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    picture?: string;
    reactions: {
        user: Types.ObjectId;
        reaction: Reaction;
        reaction_timestamp: number;
    }[];
    comments: CommentModel[];
    created_timestamp: number;
    is_edited: boolean;
}

export interface PostSummary {
    post_id: Types.ObjectId | string;
    author_id: Types.ObjectId | string;
    profile_picture: string;
    is_mine: boolean;
    author: string;
    content: string;
    picture?: string;
    reactions: {
        type: Reaction;
        list: string[];
    }[];
    reaction_display: string;
    full_reaction_list: string[];
    reaction_count: number;
    recent_comments: CommentData[];
    created_at: {
        relative: string;
        absolute: string;
    };
}

export interface PostBase {
    _id: Types.ObjectId;
    author: UserModel;
    content: string;
    picture?: string;
    reactions: {
        user: UserModel;
        reaction: Reaction;
        reaction_timestamp: number;
    }[];
    comments: CommentBase[];
    created_timestamp: number;
    is_edited: boolean;
}
