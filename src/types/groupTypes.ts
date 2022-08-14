import { Types } from "mongoose";
import { JoinRestriction, GroupStatus } from "./enumTypes";
import { UserSummary } from "./userTypes";
import { InterestSummary } from "./interestTypes";
import { PostSummary } from "./postTypes";
import { EventSummary } from "./eventTypes";

export interface GroupModel {
    _id: Types.ObjectId;
    name: string;
    description: string;
    group_image: string;
    join_restriction: JoinRestriction;
    users: {
        user: Types.ObjectId;
        status: GroupStatus;
        join_timestamp: number;
    }[];
    interests: Types.ObjectId[];
    events: Types.ObjectId[];
    posts: Types.ObjectId[];
    created_timestamp: number;
    update_history: {
        user: Types.ObjectId;
        update: string;
        timestamp: number;
    }[];
}

export interface GroupSummary {
    id: Types.ObjectId;
    group: string;
    description: string;
    group_image: string;
    my_status: "Admin" | "Member" | "Pending" | "None";
    is_joined: boolean;
    join_restriction: JoinRestriction;
    user_count: number;
    friends_in_group_count: number;
}

export interface GroupData extends GroupSummary {
    member_count: number;
    admin_count: number;
    founder_id: Types.ObjectId;
    founder_name: string;
    users: UserSummary[];
    interests: InterestSummary[];
    events: EventSummary[];
    posts: PostSummary[];
    join_date: string;
    created_at: string;
    update_history: {
        update: string;
        updated_at: string;
    }[];
}

export interface AdminGroupData extends GroupData {
    join_requests: UserSummary[];
    banned_users: UserSummary[];
    update_history: {
        updated_by: UserSummary;
        update: string;
        updated_at: string;
    }[];
}
