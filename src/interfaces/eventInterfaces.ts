import { Types } from "mongoose";

export interface Event {
    _id: Types.ObjectId;
    event: string;
    creator: Types.ObjectId;
    group: Types.ObjectId;
    description: string;
    attending: {
        _id: Types.ObjectId;
        is_confirmed: boolean;
    }[];
    comments: Types.ObjectId[];
    starts_at: number;
    ends_at?: number;
    created_at: number;
}
