import { Types } from "mongoose";
import { JoinRestriction, GroupStatus } from "./enumTypes";

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
