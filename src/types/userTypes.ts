import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    is_online: boolean;
    join_date: number;
    friends: {
        _id: Types.ObjectId;
        friendship_date: number;
    }[];
    messages: {
        _id: Types.ObjectId;
        last_checked: number;
    }[];
    groups: Types.ObjectId[];
    posts: Types.ObjectId[];
    tags: Types.ObjectId[];
    events: Types.ObjectId[];
    notifications: {
        _id: Types.ObjectId;
        ref: string;
        title: string;
        message: string;
        timestamp: number;
        is_read: boolean;
    }[];
    chat_notifs: {
        _id: Types.ObjectId;
        message: string;
        timestamp: number;
    }[];
}
