import { Types } from "mongoose";

export interface UserProps {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
}

export interface UserModel {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    is_online: boolean;
    join_timestamp: number;
    friends: {
        _id: Types.ObjectId;
        timestamp: number;
    }[];
    messages: {
        _id: Types.ObjectId;
        timestamp: number;
    }[];
    groups: Types.ObjectId[];
    posts: Types.ObjectId[];
    tags: Types.ObjectId[];
    events: Types.ObjectId[];
    notifications: {
        _id: Types.ObjectId;
        title: string;
        message: string;
        ref_id: string;
        ref_model: string;
        timestamp: number;
        is_read: boolean;
    }[];
    chat_notifs: {
        _id: Types.ObjectId;
        message: string;
        timestamp: number;
    }[];
}
