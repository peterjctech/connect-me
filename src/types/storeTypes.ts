import { Types } from "mongoose";

export interface UserStore {
    _id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    join_date: string;
    friends: {
        _id: Types.ObjectId;
        full_name: string;
        profile_picture: string;
        friendship_date: string;
        timestamp: number;
    }[];
    messages: {
        _id: Types.ObjectId;
        title: string;
        last_checked: string;
        timestamp: number;
    }[];
    groups: {
        _id: Types.ObjectId;
        name: string;
        description: string;
        group_image: string;
    }[];
    posts: {
        _id: Types.ObjectId;
        author_id: Types.ObjectId;
        author: string;
        content: string;
        ref_id: Types.ObjectId;
        ref_model: string;
        reaction_count: number;
        comment_count: number;
        created_at: string;
        updated_at?: string;
    }[];
    tags: {
        _id: Types.ObjectId;
        title: string;
        color: string;
    }[];
    events: {
        _id: Types.ObjectId;
        event: string;
        group_id: Types.ObjectId;
        description: string;
        starts_at: string;
        ends_at?: string;
        timestamp: number;
    }[];
    notifications: {
        _id: Types.ObjectId;
        title: string;
        message: string;
        ref_id: Types.ObjectId;
        ref_model: string;
        timestamp: number;
        is_read: boolean;
        datetime: string;
    }[];
    chat_notifs: {
        _id: Types.ObjectId;
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
