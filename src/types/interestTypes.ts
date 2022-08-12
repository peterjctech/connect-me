import { Types } from "mongoose";
import { Colors } from "./miscTypes";
import { UserSummary } from "./userTypes";
import { GroupSummary } from "./groupTypes";

export interface CreateInterestProps {
    interest: string;
    color: Colors;
}

export interface InterestModel {
    _id: Types.ObjectId;
    interest: string;
    color: Colors;
    user_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}

export interface InterestSummary {
    id: string;
    interest: string;
    color: Colors;
}

export interface SingleInterest {
    id: string;
    interest: string;
    color: Colors;
    users: UserSummary[];
    groups: GroupSummary[];
}
