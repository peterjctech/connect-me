import { Types } from "mongoose";
import { GroupSummary } from "./groupTypes";
import { Color } from "./miscTypes";
import { UserSummary } from "./userTypes";

export interface InterestModel {
    _id: Types.ObjectId;
    interest: string;
    color: Color;
    user_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}

export interface InterestSummary {
    id: Types.ObjectId;
    interest: string;
    color: Color;
    is_added: boolean;
}

export interface InterestData extends InterestSummary {
    users: UserSummary[];
    friend_count: number;
    total_count: number;
    groups: GroupSummary[];
}
