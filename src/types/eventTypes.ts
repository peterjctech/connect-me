import { Types } from "mongoose";
import { CommentModel, Reaction, SingleComment, EventMemberStatus } from "./miscTypes";
import { UserSummary } from "./userTypes";

interface SingleEventMembers extends UserSummary {
    status: EventMemberStatus;
}

export interface CreateEventProps {
    event: string;
    groupId: string;
    description: string;
    startsAt: number;
    endsAt: number;
}

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

export interface EventSummary {
    id: string;
    event: string;
    description: string;
    starts_at: string;
    ends_at?: string;
    confirmed_count: number;
}

export interface SingleEvent {
    id: string;
    event: string;
    creator_id: string;
    creator_name: string;
    description: string;
    members: SingleEventMembers[];
    confirmed_count: number;
    maybe_count: number;
    no_count: number;
    unresponsive_count: number;
    reaction_list: [Reaction];
    reaction_summary: string;
    reactions: {
        user_id: string;
        full_name: string;
        reaction: Reaction;
        is_friend: boolean;
    }[];
    comment_count: number;
    comments: SingleComment[];
    starts_at: string;
    ends_at?: string;
}
