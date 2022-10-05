import { ID } from "./modelTypeHelpers";

export type MainTheme = "Light" | "Dark" | "Void";
export type ColorTheme = "Blue" | "Purple" | "Red" | "Green";
export type PrivacyOption = "Everyone" | "Friends Only" | "Show Mutual" | "Private";

export interface UserModel {
    _id: ID;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    birthday: Date;
    intro?: string;
    joined_at: Date;
    tags: ID[];
    groups: ID[];
    events: ID[];
    chats: ID[];
    notifications: NotificationSubmodel[];
    settings: {
        theme: MainTheme;
        color: ColorTheme;
        default_post_is_public: boolean;
        group_privacy: PrivacyOption;
        event_privacy: PrivacyOption;
        friend_privacy: PrivacyOption;
    };
}

export interface FriendshipModel {
    _id: ID;
    sender: ID;
    reciever: ID;
    is_accepted: boolean;
}

export interface ChatModel {
    _id: ID;
    title: string;
    members: {
        user_id: ID;
        is_read: boolean;
    }[];
    messages: ChatMessageSubmodel[];
    activity: {
        message: string;
        date: Date;
    }[];
}

export interface ChatMessageSubmodel {
    _id: ID;
    sender: ID;
    content: string;
    sent_at: Date;
}

export interface NotificationSubmodel {
    _id: ID;
    title: string;
    content: string;
    redirect: string;
    notified_at: Date;
    is_read: boolean;
}
