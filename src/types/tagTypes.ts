import { ID, ListAndCount } from "./helperTypes";

export type Color = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "magenta" | "pink" | "white";

export interface BriefTagSummary {
    tag_id: string;
    name: string;
}
export interface TagSummary {
    tag_id: string;
    name: string;
    color: Color;
    is_added: boolean;
}
export interface TagLayoutData {
    tag_id: string;
    name: string;
    color: Color;
    is_added: boolean;
    user_count: number;
    friends: ListAndCount;
}

export interface TagModel {
    _id: ID;
    name: string;
    color: Color;
    users: ID[];
    posts: ID[];
    events: ID[];
    groups: ID[];
}
