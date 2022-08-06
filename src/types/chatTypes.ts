import { Types } from "mongoose";

export interface Chat {
    _id: Types.ObjectId;
    title: string;
    members: Types.ObjectId[];
    messages: {
        _id: Types.ObjectId;
        content: string;
        timestamp: number;
    }[];
}
