import { Types } from "mongoose";
import { CommentModel, SingleComment, Reaction } from "./miscTypes";

export interface CreatePostProps {
    authorId: string;
    content: string;
    picture: string;
}

export interface PostModel {
    _id: Types.ObjectId;
    author_id: Types.ObjectId;
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

export interface SinglePost {
    id: string;
    author_id: string;
    author_name: string;
    content?: string;
    picture?: string;
    reaction_list: [Reaction];
    reaction_summary: string;
    reactions: {
        user_id: string;
        full_name: string;
        reaction: Reaction;
        is_friend: boolean;
    }[];
    comment_count: number;
    comments: SingleComment[];
    created_at: {
        approximate: string;
        exact: string;
    };
    is_edited: boolean;
}

export interface SingleGroupPost extends SinglePost {
    group_id: string;
    group_name: string;
}
