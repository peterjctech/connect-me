export interface UserModel {
    user_id: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    // User
    friends: string[];
    // Chat
    messages: string[];
    // Group
    groups: string[];
    // Status
    statuses: string[];
    // Interest
    interests: string[];
    notifications: {
        title: string;
        message: string;
        path: string;
        is_read: boolean;
    }[];
    // User
    friend_requests: string[];
    chat_notifs: {
        user_id: string;
        user: string;
        message: string;
    };
}
