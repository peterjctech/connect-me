import { Types } from "mongoose";
import { MainTheme, ColorTheme, PrivacyOption, GroupUserStatus, EventUserStatus } from "./enumTypes";
import { INotification } from "./notifTypes";

type ID = Types.ObjectId;

export interface IUser {
    _id: ID;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    joined_at: Date;
    friends: {
        user: ID;
        friended_at: Date;
    }[];
    posts: ID[];
    groups: {
        group: ID;
        status: GroupUserStatus;
    }[];
    events: {
        event: ID;
        status: EventUserStatus;
    }[];
    tags: ID[];
    chats: ID[];
    notifications: INotification[];
    activity: {
        ref_id: ID;
        ref_model: "User" | "Post" | "Group" | "Event" | "Tag";
        message: string;
        date: Date;
    }[];
    settings: {
        theme: MainTheme;
        color: ColorTheme;
        hide_friends: PrivacyOption;
        hide_posts: PrivacyOption;
        hide_groups: PrivacyOption;
        hide_events: PrivacyOption;
    };
}
