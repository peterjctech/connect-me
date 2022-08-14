import { Types } from "mongoose";
import { CommentModel, ReactionData, Comment } from "./miscTypes";
import { UserSummary, UserModel } from "./userTypes";
import { Reaction } from "./enumTypes";

export interface PostModel {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content?: string;
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

export interface PopulatedPostModel {
    _id: Types.ObjectId;
    author_id: UserModel;
    content?: string;
    picture?: string;
    reactions: {
        user_id: Types.ObjectId;
        reaction: Reaction;
        reaction_timestamp: number;
    }[];
    comments: CommentModel[];
    created_timestamp: number;
    is_edited: boolean;
}

export interface PostSummary {
    id: Types.ObjectId;
    author: UserSummary;
    is_mine: boolean;
    content?: string;
    picture?: string;
    reaction_list: [Reaction];
    reaction_summary: string;
    comment_count: number;
    created_at: {
        approximate: string;
        exact: string;
    };
    is_edited: boolean;
}

export interface PostData extends PostSummary {
    reactions: ReactionData[];
    comments: Comment[];
}

export interface GroupPostData extends PostData {
    group_id: Types.ObjectId;
    group: string;
}
