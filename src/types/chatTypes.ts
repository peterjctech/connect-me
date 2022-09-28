import { Types } from "mongoose";

type ID = Types.ObjectId;

export interface IChat {
    _id: ID;
    title?: string;
    members: {
        user: ID;
        last_read: Date;
    }[];
    messages: {
        user: ID;
        content: string;
        sent_at: Date;
    }[];
}
