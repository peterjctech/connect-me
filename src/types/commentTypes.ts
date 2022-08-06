import { Types } from "mongoose";

export interface CommentProps {
    author: Types.ObjectId;
    content: string;
    ref_id: Types.ObjectId;
    ref_model: string;
}

export interface CommentModel {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    ref_id: Types.ObjectId;
    ref_model: string;
    likes: Types.ObjectId[];
    created_at: number;
    updated_at?: number;
}
