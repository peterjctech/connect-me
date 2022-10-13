import { ID, TotalAndMutualCount } from "./helperTypes";
import { NotificationSubmodel } from "./submodelTypes";

export type MainTheme = "Light" | "Dark" | "Void";
export type ColorTheme = "Blue" | "Purple" | "Red" | "Green";
export type PrivacyOption = "Everyone" | "FriendsOnly" | "ShowMutual" | "Private";
export type FriendStatus = "Sent" | "Recieved" | "Accepted";

export interface BriefUserSummary {
    user_id: string;
    full_name: string;
    profile_picture: string;
}
export interface UserSummary {
    user_id: string;
    full_name: string;
    profile_picture: string;
    mutual_friend_count?: number;
    friendship_status?: FriendStatus;
}
export interface UserLayoutData {
    user_id: string;
    full_name: string;
    profile_picture: string;
    friend_count: TotalAndMutualCount;
    joined_at: string;
    intro: string;
    birthday: string;
    age: number;
    group_privacy: PrivacyOption;
    event_privacy: PrivacyOption;
    friend_privacy: PrivacyOption;
    friendship_status?: FriendStatus;
}
export interface UserStoreData {
    user_id: string;
    full_name: string;
    profile_picture: string;
    friend_count: number;
    joined_at: string;
    intro: string;
    birthday: string;
    age: number;
    theme: MainTheme;
    color: ColorTheme;
}

export interface UserSettings {
    username: string;
    first_name: string;
    last_name: string;
    intro: string;
    theme: MainTheme;
    color: ColorTheme;
    default_post_is_public: boolean;
    friend_privacy: PrivacyOption;
    group_privacy: PrivacyOption;
    event_privacy: PrivacyOption;
}

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
    friends: {
        user_id: ID;
        status: FriendStatus;
    }[];
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

interface InitializedUserStore extends UserStoreData {
    is_initialized: boolean;
}
export interface StoreInterface {
    user: InitializedUserStore;
}
