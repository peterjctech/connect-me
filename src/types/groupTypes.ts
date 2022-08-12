import { Types } from "mongoose";
import { InterestSummary } from "./interestTypes";
import { GroupStatus, JoinRestriction } from "./miscTypes";
import { SinglePost } from "./postTypes";
import { UserSummary } from "./userTypes";
import { EventSummary } from "./eventTypes";

export interface CreateGroupProps {
    group: string;
    founderId: string;
    description: string;
    groupImage: string;
    joinRestriction: JoinRestriction;
    interests: string[];
}

export interface GroupModel {
    _id: Types.ObjectId;
    group: string;
    founder: Types.ObjectId;
    description: string;
    group_image: string;
    join_restriction: JoinRestriction;
    admins: Types.ObjectId[];
    members: Types.ObjectId[];
    join_requests: Types.ObjectId[];
    banned_users: Types.ObjectId[];
    interests: Types.ObjectId[];
    events: Types.ObjectId[];
    posts: Types.ObjectId[];
    created_timestamp: number;
    update_history: {
        user_id: Types.ObjectId;
        update: string;
        timestamp: number;
    }[];
}

export interface GroupSummary {
    id: string;
    group: string;
    description: string;
    group_image: string;
    join_restriction: JoinRestriction;
    my_status: GroupStatus;
}

export interface SingleGroup {
    id: string;
    group: string;
    founder: {
        id: string;
        full_name: string;
    };
    description: string;
    group_image: string;
    join_restriction: JoinRestriction;
    admins: UserSummary[];
    members: UserSummary[];
    interests: InterestSummary[];
    events: EventSummary[];
    posts: SinglePost[];
    created_at: string;
    update_history: {
        update: string;
        updated_at: string;
    }[];
}

export interface SingleGroupAdmin extends SingleGroup {
    join_requests: UserSummary[];
    update_history: {
        updated_by: {
            user_id: string;
            full_name: string;
        };
        update: string;
        updated_at: string;
    }[];
}
