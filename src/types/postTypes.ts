import { Types } from "mongoose";
import {
    CommentModel,
    ReactionModel,
    ReactionSummary,
    ReactionDisplay,
    CommentData,
    PopulatedCommentModel,
} from "./miscTypes";
import { CreatedAt, IdAndName } from "./helperTypes";
import { Reaction } from "./enumTypes";
import { TagSummary } from "./tagTypes";

// Main
export interface PostModel {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    group?: Types.ObjectId;
    content: string;
    picture?: string;
    tags: Types.ObjectId[];
    reactions: ReactionModel[];
    comments: CommentModel[];
    created_timestamp: number;
    is_edited: boolean;
}
export interface PostData {
    post_id: string;
    author: IdAndName;
    group?: IdAndName;
    profile_picture: string;
    is_mine: boolean;
    content: string;
    picture?: string;
    reactions: ReactionSummary[];
    reaction_display: ReactionDisplay;
    recent_comments: CommentData[];
    comment_count: number;
    created_at: CreatedAt;
    is_edited: boolean;
    tags: TagSummary[];
}
export interface CreatePostProps {
    userId: string;
    content: string;
    groupId?: string;
    picture?: string;
}
export interface UpdatePostProps {
    postId: string;
    content: string;
    picture?: string;
    tags: string[];
}
export interface CommentOnPostProps {
    postId: string;
    comment: string;
}
export interface ReactToPostProps {
    postId: string;
    reaction: Reaction;
}
export interface LikeCommentProps {
    postId: string;
    commentId: string;
}

// Populated
export interface GetPostDataArgs {
    _id: Types.ObjectId;
    group?: {
        _id: Types.ObjectId;
        name: string;
    };
    author: {
        _id: Types.ObjectId;
        first_name: string;
        last_name: string;
        profile_picture: string;
    };
    reactions: {
        user: {
            first_name: string;
            last_name: string;
        };
        reaction: Reaction;
    }[];
    content: string;
    picture?: string;
    comments: PopulatedCommentModel[];
    created_timestamp: number;
    is_edited: boolean;
    tags: {
        _id: Types.ObjectId;
        name: string;
    }[];
}
