import { Types } from "mongoose";

export interface CreateConversationProps {
    members: string[];
}

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

export interface DirectMessageNotification {
    id: string;
    most_recent_message: {
        profile_picture: string;
        full_name: string;
        content: string;
        datetime: string;
    };
    is_read: boolean;
}

export interface FullConversation {
    id: string;
    title: string;
    members: {
        user_id: string;
        last_read: {
            text: string;
            timestamp: number;
        };
        full_name: string;
        profile_picture: string;
    };
    messages: {
        user_id: string;
        profile_picture: string;
        full_name: string;
        content: string;
        sent_at: string;
        sent_timestamp: number;
    }[];
}
