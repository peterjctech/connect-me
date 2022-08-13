import { Types } from "mongoose";
import { GroupSummary } from "./groupTypes";
import { Colors } from "./miscTypes";
import { UserSummary } from "./userTypes";

export interface InterestModel {
    _id: Types.ObjectId;
    interest: string;
    color: Colors;
    user_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}

export interface InterestSummary {
    id: Types.ObjectId;
    interest: string;
    color: Colors;
    is_added: boolean;
}

export interface InterestData extends InterestSummary {
    users: {
        friends: UserSummary[];
        non_friends: UserSummary[];
        friend_count: number;
        total_count: number;
    };
    groups: GroupSummary[];
}
