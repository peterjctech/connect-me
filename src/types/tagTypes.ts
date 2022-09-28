import { Types } from "mongoose";
import { Color } from "./enumTypes";

type ID = Types.ObjectId;

export interface ITag {
    _id: ID;
    name: string;
    color: Color;
    users: ID[];
    posts: ID[];
    groups: ID[];
    events: ID[];
}
