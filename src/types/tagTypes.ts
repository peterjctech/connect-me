import { Types } from "mongoose";

export interface TagProps {
    title: string;
    color: string;
}

export interface TagModel {
    _id: Types.ObjectId;
    title: string;
    color: string;
    user_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}
