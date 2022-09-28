import { Types } from "mongoose";
import { IReaction } from "./reactionTypes";
import { IComment } from "./commentTypes";
import { PrivacyOption } from "./enumTypes";

type ID = Types.ObjectId;

export interface IPost {
    _id: ID;
    author: ID;
    group?: ID;
    content: string;
    picture?: string;
    tags: ID[];
    reactions: IReaction[];
    comments: IComment[];
    created_at: Date;
    is_edited: boolean;
    privacy: PrivacyOption;
}
