export interface EventModel {
    event_id: string;
    event: string;
    description?: string;
    users: {
        user_id: string;
        is_confirmed: boolean;
    }[];
    posts: string[];
    starts_at: number;
    ends_at?: number;
    created_at: number;
}
