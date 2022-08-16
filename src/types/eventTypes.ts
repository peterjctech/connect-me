import { Types } from "mongoose";
import { CommentModel } from "./miscTypes";
import { Reaction, EventMemberStatus } from "./enumTypes";

export interface EventModel {
    _id: Types.ObjectId;
    name: string;
    creator: Types.ObjectId;
    group: Types.ObjectId;
    description: string;
    users: {
        user: Types.ObjectId;
        status: EventMemberStatus;
        join_timestamp: number;
    }[];
    reactions: {
        user: Types.ObjectId;
        reaction: Reaction;
        reaction_timestamp: number;
    }[];
    comments: CommentModel[];
    start_timestamp: number;
    end_timestamp?: number;
    created_timestamp: number;
}
