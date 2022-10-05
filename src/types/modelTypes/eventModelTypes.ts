import { ReactionSubmodel, CommentSubmodel } from "./generalSubmodelTypes";
import { ID, Change } from "./modelTypeHelpers";

export type EventRestriction = "Open" | "Friends" | "Members" | "Private";
export type EventMemberStatus = "Yes" | "Maybe" | "No" | "Invited";

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
