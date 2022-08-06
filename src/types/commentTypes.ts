import { Types } from "mongoose";

export interface Comment {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    ref_id: Types.ObjectId;
    ref_model: string;
    likes: Types.ObjectId[];
    created_at: number;
    updated_at?: number;
}
