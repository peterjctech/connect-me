import { Types } from "mongoose";
import { CommentModel } from "./miscTypes";
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
