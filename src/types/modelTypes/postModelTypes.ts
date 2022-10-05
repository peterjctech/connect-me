import { ID, Change } from "./modelTypeHelpers";
import { ReactionSubmodel, CommentSubmodel } from "./generalSubmodelTypes";

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
