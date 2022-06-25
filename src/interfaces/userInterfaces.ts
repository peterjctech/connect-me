export interface UserModel {
    user_id: string;
    username: string;
    password: string;
    first_name: string;
    last_name?: string;
    profile_picture: {
        image: string;
        timestamp: number;
    };
    is_online: boolean;
    friends: {
        user_id: string;
        friendship_date: number;
    }[];
    messages: {
        chat_id: string;
        last_checked: number;
    }[];
    groups: string[];
    posts: string[];
    interests: string[];
    events: string[];
    notifications: {
        title: string;
        message: string;
        path: string;
        timestamp: number;
        is_read: boolean;
    }[];
    friend_requests: {
        user_id: string;
        timestamp: number;
    }[];
    chat_notifs: {
        user_id: string;
        chat_id: string;
        message: string;
        timestamp: number;
    }[];
}

export interface CreateUserArgs {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}
