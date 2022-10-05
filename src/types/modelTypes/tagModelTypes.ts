import { ID } from "./modelTypeHelpers";

export type Color = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "magenta" | "pink" | "white";

export interface TagModel {
    _id: ID;
    name: string;
    color: Color;
    users: ID[];
    posts: ID[];
    events: ID[];
    groups: ID[];
}
