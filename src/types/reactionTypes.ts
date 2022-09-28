import { Types } from "mongoose";
import { Reaction } from "./enumTypes";

type ID = Types.ObjectId;

export interface IReaction {
    user: ID;
    reaction: Reaction;
    reacted_at: Date;
}
