import { Types } from "mongoose";
import { Reaction } from "./enumTypes";
import { ListAndCount, CreatedAt } from "./helperTypes";
import { UserModel } from "./userTypes";

export interface ReactionModel {
    user: Types.ObjectId;
    reaction: Reaction;
    reaction_timestamp: number;
}
export interface ReactionDisplay {
    standard: number;
    extended: string;
}
export interface CommentModel {
    id: string;
    author: Types.ObjectId;
    content: string;
    likes: Types.ObjectId[];
    created_timestamp: number;
    is_edited: boolean;
}
export interface ReactionSummary {
    type: Reaction;
    list: string[];
}
export interface CommentData {
    user_id: string;
    full_name: string;
    profile_picture: string;
    content: string;
    likes: ListAndCount;
    created_at: CreatedAt;
}

// Populated
export interface PopulatedCommentModel {
    id: string;
    author: UserModel;
    content: string;
    likes: UserModel[];
    created_timestamp: number;
    is_edited: boolean;
}
export interface PopulatedReactionModel {
    user: UserModel;
    reaction: Reaction;
    reaction_timestamp: number;
}
