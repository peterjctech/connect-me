import { Types } from "mongoose";
import { UserSummary } from "./userTypes";

export interface ConversationModel {
    _id: Types.ObjectId;
    title: string;
    members: {
        user_id: Types.ObjectId;
        last_read_timestamp: number;
    }[];
    messages: {
        user_id: Types.ObjectId;
        content: string;
        timestamp: number;
    }[];
}

export interface ConversationSummary {
    id: Types.ObjectId;
    title: string;
    most_recent_message: {
        profile_picture: string;
        full_name: string;
        content: string;
        datetime: string;
    };
    is_read: boolean;
}

export interface ConversationData {
    id: Types.ObjectId;
    title: string;
    messages: {
        author_id: Types.ObjectId;
        author_name: string;
        profile_picture: string;
        content: string;
        datetime: string;
        timestamp: number;
    }[];
    members: UserSummary[];
    is_read: boolean;
    read_timestamp: number;
}
