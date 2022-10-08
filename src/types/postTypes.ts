import { BriefTagSummary } from "./tagTypes";
import { Reaction } from "./modelTypes/modelTypeHelpers";
import { ReactionDisplay, CreatedAt, ReactionSummary, CommentData } from "./otherTypes";

export interface PostSummary {
    post_id: string;
    author: {
        id: string;
        full_name: string;
        profile_picture: string;
    };
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
    author: {
        id: string;
        full_name: string;
        profile_picture: string;
    };
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
