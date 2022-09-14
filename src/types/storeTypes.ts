import { ColorThemes, MainThemes } from "./enumTypes";

export interface UserStoreData {
    user_id: string;
    full_name: string;
    profile_picture: string;
    friend_count: number;
    join_date: string;
    theme: MainThemes;
    color: ColorThemes;
}

export interface UserStoreInterface extends UserStoreData {
    is_initialized: boolean;
}

export interface StoreInterface {
    user: UserStoreInterface;
}
