import { Types } from "mongoose";
import { Color } from "./enumTypes";

export interface InterestModel {
    _id: Types.ObjectId;
    name: string;
    color: Color;
    user_list: Types.ObjectId[];
    group_list: Types.ObjectId[];
}
