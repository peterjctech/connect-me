import { ID, TotalAndFriendsCount, CreatedAt } from "./helperTypes";
import { ReactionSubmodel } from "./submodelTypes";
import { BriefUserSummary } from "./userTypes";

export type GroupMemberStatus = "Admin" | "Member";
export type GroupUserStatus = "RequestedInvite" | "Invited" | "Banned";
export type GroupRestriction = "Open" | "Invite" | "Private";

export interface GroupSummary {
    group_id: string;
    name: string;
    group_image: string;
    member_count: TotalAndFriendsCount;
    restriction: GroupRestriction;
    my_status?: GroupMemberStatus | GroupUserStatus;
}

export interface GroupLayoutData {
    group_id: string;
    owner: BriefUserSummary;
    name: string;
    description: string;
    group_image: string;
    member_count: TotalAndFriendsCount;
    created_at: CreatedAt;
    restriction: GroupRestriction;
    is_authorized: boolean;
    is_admin: boolean;
    is_member: boolean;
}

export interface GroupMembers {
    admins: BriefUserSummary[];
    members: BriefUserSummary[];
    invited: BriefUserSummary[];
    requested: BriefUserSummary[];
    banned: BriefUserSummary[];
}

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
