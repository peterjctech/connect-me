import { EventMemberStatus, EventRestriction } from "./modelTypes/eventModelTypes";

export interface EventSummary {
    event_id: string;
    user?: {
        id: string;
        full_name: string;
        profile_picture: string;
    };
    group?: {
        id: string;
        name: string;
        group_image: string;
    };
    name: string;
    confirmed_count: {
        total: number;
        friends: number;
    };
    datetime: string;
    can_edit: boolean;
    restriction: EventRestriction;
    my_status?: EventMemberStatus;
}
