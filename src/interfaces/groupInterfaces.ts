export interface GroupModel {
    group_id: string;
    name: string;
    description: string;
    // Private, Open, Invite
    visibility: string;
    location: string;
    // Interest
    tags: string[];
    // User
    users: {
        user_id: string;
        is_admin: boolean;
        availability: {
            year: number;
            day_of_year: number;
            time: string;
        }[];
    }[];
    meetups: {
        title: string;
        description: string;
        date: string;
        timestamp: number;
        // User
        confirmed: string[];
        // User
        maybe: string[];
    };
}
