import { ReactionSubmodel } from "./generalSubmodelTypes";
import { ID } from "./modelTypeHelpers";

export type GroupMemberStatus = "Admin" | "Member";
export type GroupUserStatus = "Requested Invite" | "Invited" | "Banned";
export type GroupRestriction = "Open" | "Friends" | "Invite" | "Private";

export interface GroupModel {
    _id: ID;
    owner_id: ID;
    name: string;
    description: string;
    group_image: string;
    members: {
        user_id: ID;
        status: GroupMemberStatus;
    }[];
    other_users: {
        user_id: ID;
        status: GroupUserStatus;
    }[];
    meta_activity: {
        updater_id: ID;
        change_message: string;
        new_owner?: ID;
        new_description?: string;
        new_image?: string;
        date: Date;
        reactions: ReactionSubmodel[];
    }[];
    user_activity: {
        user_id: ID;
        message: string;
        date: Date;
    }[];
    tags: ID[];
    created_at: Date;
    restriction: GroupRestriction;
}
