import { Types } from "mongoose";

export type ID = Types.ObjectId;
export type Change = "Created" | "Reacted" | "Commented";

export interface CreatedAt {
    absolute: string;
    relative: string;
}

export interface ListAndCount {
    list: string[];
    count: number;
}

export interface TotalAndFriendsCount {
    total: number;
    friends: number;
}

export interface TotalAndMutualCount {
    total?: number;
    mutual: number;
}
