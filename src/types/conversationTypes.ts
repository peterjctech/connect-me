import { Types } from "mongoose";

export interface ConversationModel {
    _id: Types.ObjectId;
    title: string;
    members: {
        user: Types.ObjectId;
        last_read_timestamp: number;
    }[];
    messages: {
        user: Types.ObjectId;
        content: string;
        timestamp: number;
    }[];
}
export interface ConversationSummary {
    convo_id: string;
    title: string;
    is_read: boolean;
    last_message?: {
        name: string;
        message: string;
        time: string;
        profile_picture: string;
    };
}
export interface CreateConversationProps {
    members: string[];
}
export interface UpdateConversationSettingsProps {
    convoId: string;
    title: string;
    members: string[];
}
