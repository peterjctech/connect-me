import { Types } from "mongoose";
import {
    CommentModel,
    ReactionModel,
    ReactionSummary,
    ReactionDisplay,
    CommentData,
    PopulatedCommentModel,
    PopulatedReactionModel,
} from "./miscTypes";
import { CreatedAt } from "./helperTypes";
import { Reaction } from "./enumTypes";
import { TagModel, TagSummary } from "./tagTypes";
import { UserModel } from "./userTypes";

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
    author_id: string;
    author: string;
    group_id?: string;
    profile_picture: string;
    is_mine: boolean;
    content: string;
    picture?: string;
    reactions: ReactionSummary[];
    reaction_display: ReactionDisplay;
    full_reaction_list: string[];
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
export interface PopulatedPostModel {
    _id: Types.ObjectId;
    author: UserModel;
    content: string;
    picture?: string;
    tags: TagModel[];
    reactions: PopulatedReactionModel[];
    comments: PopulatedCommentModel[];
    created_timestamp: number;
    is_edited: boolean;
}
