import { ID, ListAndCount } from "./helperTypes";
import { ChatMessageSubmodel } from "./submodelTypes";

export interface ChatSummary {
    chat_id: string;
    title: string;
    last_message: {
        profile_picture: string;
        message: string;
        sent_at: string;
    };
}

export interface ChatMessage {
    user_id: string;
    full_name: string;
    profile_picture: string;
    sent_at: string;
    message: string;
    is_mine: boolean;
}

export interface ChatData {
    chat_id: string;
    title: string;
    members: ListAndCount;
    messages: ChatMessage[];
    read_users: string;
    next_skip_timestamp: number;
}

export interface ChatModel {
    _id: ID;
    title: string;
    members: {
        user_id: ID;
        is_read: boolean;
    }[];
    messages: ChatMessageSubmodel[];
    activity: {
        message: string;
        date: Date;
    }[];
}
