import { Types } from "mongoose";

type ID = Types.ObjectId;

export interface IComment {
    _id: ID;
    author: ID;
    content: string;
    likes: ID[];
    created_at: Date;
    is_edited: boolean;
}
