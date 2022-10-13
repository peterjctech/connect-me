import { BriefTagSummary } from "./tagTypes";
import { ID, Change, CreatedAt } from "./helperTypes";
import {
    ReactionSubmodel,
    CommentSubmodel,
    Reaction,
    ReactionSummary,
    ReactionDisplay,
    CommentData,
} from "./submodelTypes";
import { BriefUserSummary } from "./userTypes";

export interface PostSummary {
    post_id: string;
    author: BriefUserSummary;
    content: string;
    media?: string;
    tags: BriefTagSummary[];
    reactions: Reaction[];
    my_reaction?: Reaction;
    reaction_display: ReactionDisplay;
    recent_comments: CommentData[];
    comment_count: number;
    created_at: CreatedAt;
    is_edited: boolean;
    is_mine: boolean;
}
export interface PostData {
    post_id: string;
    author: BriefUserSummary;
    group?: {
        id: string;
        name: string;
    };
    content: string;
    media?: string;
    tags: BriefTagSummary[];
    reactions: ReactionSummary[];
    my_reaction?: Reaction;
    reaction_display: ReactionDisplay;
    comments: CommentData[];
    created_at: CreatedAt;
    is_edited: boolean;
    is_mine: boolean;
}
export interface GetPostsResponse {
    next_skip_timestamp: number;
    posts: PostSummary[];
}

export interface MoreComments {
    next_skip_timestamp: number;
    comments: CommentData[];
}

export interface PostModel {
    _id: ID;
    author_id: ID;
    group_id?: ID;
    content: string;
    media?: string;
    tags: ID[];
    reactions: ReactionSubmodel[];
    comments: CommentSubmodel[];
    created_at: Date;
    last_change: {
        user_id: ID;
        change: Change;
        changed_at: Date;
    };
    is_edited: boolean;
    is_public: boolean;
}
