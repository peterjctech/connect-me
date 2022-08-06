import { Types } from "mongoose";

export interface Tag {
    _id: Types.ObjectId;
    title: string;
    color: string;
    user_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}
