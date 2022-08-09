import { Types } from "mongoose";

export interface ChatNotif {
    id: string;
    message: string;
    timestamp: number;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    ref_id: string;
    ref_model: string;
    timestamp: number;
    is_read: boolean;
}

export interface UserProps {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
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
    notifications: Notification[];
    chat_notifs: ChatNotif[];
}
