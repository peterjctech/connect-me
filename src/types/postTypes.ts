import { Types } from "mongoose";

export interface PostProps {
    author: Types.ObjectId;
    content: string;
    ref_id: Types.ObjectId;
    ref_model: string;
}

export interface PostModel {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    ref_id: Types.ObjectId;
    ref_model: string;
    reactions: {
        _id: Types.ObjectId;
        reaction: string;
    }[];
    comments: Types.ObjectId[];
    created_at: number;
    updated_at?: number;
}
