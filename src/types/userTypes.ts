import { MainTheme, ColorTheme, PrivacyOption } from "./modelTypes/userModelTypes";

export interface RegisterUserProps {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthMonth: string;
    birthYear: string;
    intro: string;
}

export interface UserStoreData {
    user_id: string;
    full_name: string;
    profile_picture: string;
    friend_count: number;
    joined_at: string;
    intro: string;
    theme: MainTheme;
    birthday: string;
    age: number;
    color: ColorTheme;
}

interface InitializedUserStore extends UserStoreData {
    is_initialized: boolean;
}

export interface StoreInterface {
    user: InitializedUserStore;
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
