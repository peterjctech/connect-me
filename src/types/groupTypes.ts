import { GroupUserStatus, GroupRestriction } from "./modelTypes/groupModelTypes";

export interface GroupSummary {
    group_id: string;
    name: string;
    group_image: string;
    restriction: GroupRestriction;
    member_count: {
        total: number;
        friends: number;
    };
    my_status?: GroupUserStatus;
}
