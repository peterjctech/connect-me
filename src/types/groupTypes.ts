import { Types } from "mongoose";
import { GroupUserStatus, JoinRestriction } from "./enumTypes";
import { IReaction } from "./reactionTypes";

type ID = Types.ObjectId;

export interface IGroup {
    _id: ID;
    founder: ID;
    name: string;
    description: string;
    group_image: string;
    users: {
        user: ID;
        status: GroupUserStatus;
        is_member: boolean;
        joined_at?: Date;
    }[];
    tags: ID[];
    events: ID[];
    posts: ID[];
    created_at: Date;
    update_history: {
        user: ID;
        update_message: string;
        update_image?: string;
        updated_at: Date;
        reactions: IReaction[];
    };
    settings: {
        join_restriction: JoinRestriction;
        hide_events: boolean;
        hide_posts: boolean;
    };
}
