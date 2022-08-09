export interface UserStore {
    _id: string;
    full_name: string;
    profile_picture: string;
    join_date: string;
    friends: {
        _id: string;
        full_name: string;
        profile_picture: string;
        friendship_date: string;
        timestamp: number;
    }[];
    messages: {
        _id: string;
        title: string;
        last_checked: string;
        timestamp: number;
    }[];
    groups: {
        _id: string;
        name: string;
        description: string;
        group_image: string;
    }[];
    posts: {
        _id: string;
        author: string;
        content: string;
        ref_id: string;
        ref_model: string;
        reaction_count: number;
        comment_count: number;
        created_at: string;
        updated_at?: string;
    }[];
    tags: {
        _id: string;
        title: string;
        color: string;
    }[];
    events: {
        _id: string;
        event: string;
        group_id: string;
        description: string;
        starts_at: string;
        ends_at?: string;
        timestamp: number;
    }[];
    notifications: {
        title: string;
        message: string;
        ref_id: string;
        ref_model: string;
        timestamp: number;
        is_read: boolean;
        datetime: string;
    }[];
    chat_notifs: {
        _id: string;
        message: string;
        timestamp: number;
        datetime: string;
    }[];
    friend_count: number;
    is_initialized: boolean;
}

export interface StateInterface {
    user: UserStore;
}
