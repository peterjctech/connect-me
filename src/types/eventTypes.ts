import { ID, Change, TotalAndFriendsCount, CreatedAt } from "./helperTypes";
import {
    ReactionSubmodel,
    CommentSubmodel,
    ReactionSummary,
    CommentData,
    Reaction,
    ReactionDisplay,
} from "./submodelTypes";
import { BriefTagSummary } from "./tagTypes";
import { BriefUserSummary, UserSummary } from "./userTypes";

export type EventRestriction = "Open" | "Restricted" | "Private";
export type EventMemberStatus = "Yes" | "Maybe" | "No" | "Invited";

export interface EventSummary {
    event_id: string;
    name: string;
    user_id?: string;
    group_id?: string;
    picture: string;
    reference_name: string;
    confirmed_count: TotalAndFriendsCount;
    datetime: string;
    my_status?: EventMemberStatus;
}

export interface EventData {
    event_id: string;
    name: string;
    description: string;
    datetime: string;
    user?: BriefUserSummary;
    group?: {
        id: string;
        name: string;
        group_image: string;
    };
    my_status?: EventMemberStatus;
    tags: BriefTagSummary[];
    created_at: CreatedAt;
    reactions: ReactionSummary[];
    reaction_display: ReactionDisplay;
    my_reaction: Reaction;
    comments: CommentData[];
}

export interface EventUsers {
    yes: UserSummary[];
    maybe: UserSummary[];
    no: UserSummary[];
    invited: UserSummary[];
}

export interface EventSettings {
    starts_at: number;
    ends_at?: number;
    restriction: EventRestriction;
}

export interface EventModel {
    _id: ID;
    ref_id: ID;
    ref_model: "Group" | "User";
    name: string;
    description: string;
    users: {
        user_id: ID;
        status: EventMemberStatus;
    }[];
    tags: ID[];
    reactions: ReactionSubmodel[];
    comments: CommentSubmodel[];
    created_at: Date;
    starts_at: Date;
    ends_at?: Date;
    last_change: {
        user_id: ID;
        change: Change;
        changed_at: Date;
    };
    restriction: EventRestriction;
}
