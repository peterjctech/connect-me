import { Types } from "mongoose";
import { JoinRestriction, GroupStatus } from "./enumTypes";
import { ListAndCount } from "./helperTypes";
import { PostData } from "./postTypes";
import { TagSummary } from "./tagTypes";

// Main
export interface GroupModel {
    _id: Types.ObjectId;
    name: string;
    description: string;
    group_image: string;
    join_restriction: JoinRestriction;
    users: GroupUser[];
    tags: Types.ObjectId[];
    events: Types.ObjectId[];
    posts: Types.ObjectId[];
    created_timestamp: number;
    update_history: GroupUpdateHistory[];
}
export interface GroupSummary {
    group_id: string;
    name: string;
    description: string;
    group_image: string;
    join_restriction: JoinRestriction;
    user_count: number;
    friends_joined: ListAndCount;
    my_status?: GroupStatus;
}
export interface GroupData {
    group_id: string;
    name: string;
    description: string;
    group_image: string;
    my_status?: GroupStatus;
    join_restriction: JoinRestriction;
    user_count: number;
    friends_joined: ListAndCount;
    posts?: PostData[];
    tags: TagSummary[];
}
export interface CreateGroupProps {
    name: string;
    description: string;
    joinRestriction: JoinRestriction;
    tags: string[];
}
export interface UpdateGroupSettingsProps {
    groupId: string;
    name: string;
    description: string;
    groupImage: string;
    joinRestriction: string;
    tags: string[];
}
export interface UpdateGroupUser {
    groupId: string;
    userId: string;
    status: GroupStatus | "None";
}

// Helpers
export interface GroupUser {
    user: Types.ObjectId;
    status: GroupStatus;
    join_timestamp: number;
}
export interface GroupUpdateHistory {
    user: Types.ObjectId;
    update: string;
    timestamp: number;
}
