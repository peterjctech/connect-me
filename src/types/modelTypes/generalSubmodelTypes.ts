import { ID, Reaction } from "./modelTypeHelpers";

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
