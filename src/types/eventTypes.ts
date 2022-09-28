import { Types } from "mongoose";
import { EventUserStatus, JoinRestriction, PrivacyOption } from "./enumTypes";
import { IReaction } from "./reactionTypes";
import { IComment } from "./commentTypes";

type ID = Types.ObjectId;

export interface IEvent {
    _id: ID;
    creator: ID;
    group?: ID;
    name: string;
    description: string;
    join_restriction: JoinRestriction;
    users: {
        user: ID;
        status: EventUserStatus;
    }[];
    reactions: IReaction[];
    comments: IComment[];
    tags: ID[];
    created_at: Date;
    starts_at: Date;
    ends_at?: Date;
    privacy: PrivacyOption;
}
