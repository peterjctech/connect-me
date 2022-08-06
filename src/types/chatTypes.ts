import { Types } from "mongoose";

export interface ChatProps {
    title: string;
    members: Types.ObjectId[];
}

export interface ChatModel {
    _id: Types.ObjectId;
    title: string;
    members: Types.ObjectId[];
    messages: {
        _id: Types.ObjectId;
        content: string;
        timestamp: number;
    }[];
}
