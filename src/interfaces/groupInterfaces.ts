export interface GroupModel {
    group_id: string;
    group_name: string;
    description?: string;
    group_image: string;
    visibility: string;
    location?: string;
    users: {
        user_id: string;
        is_admin: boolean;
        availability: {
            year: number;
            day_of_year: number;
            time: string;
        }[];
        join_date: number;
    }[];
    meetups: string[];
    posts: string[];
    tags: string[];
    created_at: number;
}
