import { ID, CreatedAt, ListAndCount } from "./helperTypes";
import { UserSummary } from "./userTypes";

export type Reaction = "Angry" | "Like" | "Love" | "Haha" | "Sad" | "Wow";

export interface ReactionDisplay {
    standard: number;
    extended: string;
}
export interface ReactionSummary {
    type: Reaction;
    list: string[];
}
export interface ReactionData {
    type: Reaction;
    count: number;
    users: UserSummary[];
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
    is_mine: boolean;
}

export interface ChatMessageSubmodel {
    _id: ID;
    sender: ID;
    content: string;
    sent_at: Date;
}
export interface NotificationSubmodel {
    _id: ID;
    title: string;
    content: string;
    redirect: string;
    notified_at: Date;
    is_read: boolean;
}
export interface ReactionSubmodel {
    user_id: ID;
    reaction: Reaction;
}
export interface CommentSubmodel {
    _id: ID;
    author_id: ID;
    content: string;
    likes: ID[];
    created_at: Date;
    is_edited: boolean;
}
