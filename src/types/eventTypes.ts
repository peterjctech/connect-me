import { Types } from "mongoose";
import { EventMemberStatus, JoinRestriction } from "./enumTypes";
import { CreatedAt, DateAndTimeProps, ListAndCount, IdAndName } from "./helperTypes";
import { CommentModel, ReactionModel, ReactionDisplay, ReactionSummary, CommentData } from "./miscTypes";
import { TagSummary } from "./tagTypes";

// Main
export interface EventModel {
    _id: Types.ObjectId;
    name: string;
    creator: Types.ObjectId;
    group?: Types.ObjectId;
    join_restriction: JoinRestriction;
    description: string;
    users: EventMember[];
    reactions: ReactionModel[];
    comments: CommentModel[];
    timestamp: EventTimestamps;
    tags: Types.ObjectId[];
}
export interface EventSummary {
    name: string;
    tags: TagSummary[];
    group?: IdAndName;
    join_restriction: JoinRestriction;
    description: string;
    picture: string;
    my_status?: EventMemberStatus;
    yes_count: number;
    friends_confirmed: ListAndCount;
}
export interface EventData {
    name: string;
    creator: IdAndName;
    tags: TagSummary[];
    group?: IdAndName;
    join_restriction: JoinRestriction;
    description: string;
    picture: string;
    my_status?: EventMemberStatus;
    reactions: ReactionSummary[];
    reaction_display: ReactionDisplay;
    users: {
        yes: number;
        maybe: number;
        no: number;
    };
    recent_comments: CommentData[];
    comment_count: number;
    created_at: CreatedAt;
    date: string;
}
export interface CreateEventProps {
    groupId?: string;
    joinRestriction: JoinRestriction;
    name: string;
    description: string;
    startsAt: DateAndTimeProps;
    endsAt: DateAndTimeProps;
    tags: string[];
}
export interface UpdateEventSettingsProps {
    eventId: string;
    name: string;
    description: string;
    joinRestriction: JoinRestriction;
    startsAt: DateAndTimeProps;
    endAt: DateAndTimeProps;
    tags: string[];
}

// Helpers
export interface EventTimestamps {
    created: number;
    start: number;
    end?: number;
}
export interface EventMember {
    user: Types.ObjectId;
    status: EventMemberStatus;
    join_timestamp: number;
}
