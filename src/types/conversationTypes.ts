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
