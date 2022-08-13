import { Types } from "mongoose";
import { JoinRestriction } from "./miscTypes";
import { UserSummary } from "./userTypes";
import { InterestSummary } from "./interestTypes";
import { PostSummary } from "./postTypes";
import { EventSummary } from "./eventTypes";

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
    id: Types.ObjectId;
    group: string;
    description: string;
    group_image: string;
    my_status: "Admin" | "Member" | "Pending" | "None";
    is_joined: boolean;
    join_restriction: JoinRestriction;
    total_member_count: number;
    friends_in_group: UserSummary[];
    friends_in_group_count: number;
}

export interface GroupData extends GroupSummary {
    founder_id: Types.ObjectId;
    founder_name: string;
    admins: UserSummary[];
    admin_count: number;
    members: UserSummary[];
    member_count: number;
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
