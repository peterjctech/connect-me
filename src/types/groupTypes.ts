import { Types } from "mongoose";

export interface GroupProps {
    name: string;
    founder: Types.ObjectId;
    description: string;
    group_image: string;
    visibility: string;
    tags: Types.ObjectId[];
}

export interface GroupModel {
    _id: Types.ObjectId;
    name: string;
    founder: Types.ObjectId;
    description: string;
    group_image: string;
    visibility: string;
    members: {
        _id: Types.ObjectId;
        is_admin: boolean;
        join_date: number;
    }[];
    tags: Types.ObjectId[];
    events: Types.ObjectId[];
    posts: Types.ObjectId[];
    created_at: number;
}
