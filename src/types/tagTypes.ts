import { Types } from "mongoose";
import { Color } from "./enumTypes";
import { ListAndCount } from "./helperTypes";
import { PostData } from "./postTypes";

// Main
export interface TagModel {
    _id: Types.ObjectId;
    name: string;
    color: Color;
    user_list: Types.ObjectId[];
    post_list: Types.ObjectId[];
    event_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}
export interface TagSummary {
    tag_id: string;
    name: string;
}
export interface TagData {
    tag_id: string;
    name: string;
    color: Color;
    friends: ListAndCount;
    posts: PostData[];
    user_count: number;
}
export interface CreateTagProps {
    name: string;
}
