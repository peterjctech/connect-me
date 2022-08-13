import { Types } from "mongoose";
import { UserSummary } from "./userTypes";
import { CommentModel, Reaction, EventMemberStatus, Comment, ReactionData } from "./miscTypes";

export interface EventModel {
    _id: Types.ObjectId;
    event: string;
    creator_id: Types.ObjectId;
    group_id: Types.ObjectId;
    description: string;
    members: {
        user_id: Types.ObjectId;
        status: EventMemberStatus;
    }[];
    reactions: {
        user_id: Types.ObjectId;
        reaction: Reaction;
        reaction_timestamp: number;
    }[];
    comments: CommentModel[];
    start_timestamp: number;
    end_timestamp?: number;
    created_timestamp: number;
}

interface SingleEventMember extends UserSummary {
    status: EventMemberStatus;
}

export interface EventSummary {
    id: Types.ObjectId;
    event: string;
    my_status: EventMemberStatus;
    creator_id: Types.ObjectId;
    creator_name: string;
    group_id: Types.ObjectId;
    group_name: string;
    description: string;
    confirmed_count: number;
    maybe_count: number;
    reaction_list: [Reaction];
    reaction_summary?: string;
    comment_count?: number;
    starts_at: string;
    ends_at?: string;
}

export interface EventData extends EventSummary {
    members: SingleEventMember[];
    no_count: number;
    unresponsive_count: number;
    reactions: ReactionData[];
    comments: Comment[];
    join_date?: string;
}
