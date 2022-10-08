import { Reaction } from "./modelTypes/modelTypeHelpers";

export interface CreatedAt {
    absolute: string;
    relative: string;
}

export interface ReactionDisplay {
    standard: number;
    extended: string;
}

export interface ListAndCount {
    list: string[];
    count: number;
}

export interface ReactionSummary {
    type: Reaction;
    list: string[];
}

export interface CommentData {
    comment_id: string;
    user_id: string;
    full_name: string;
    profile_picture: string;
    content: string;
    likes: ListAndCount;
    created_at: CreatedAt;
    is_liked: boolean;
    is_edited: boolean;
}
