import { Types } from "mongoose";

export type ID = Types.ObjectId;
export type Reaction = "Angry" | "Like" | "Love" | "Haha" | "Sad" | "Wow";
export type Change = "Created" | "Reacted" | "Commented";
