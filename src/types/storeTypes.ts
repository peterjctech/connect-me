import { Types } from "mongoose";
import { ColorThemes } from "./enumTypes";

export interface UserStoreData {
    id: Types.ObjectId;
    full_name: string;
    profile_picture: string;
    theme: ColorThemes;
}

export interface UserStoreInterface extends UserStoreData {
    is_initialized: boolean;
}

export interface StoreInterface {
    user: UserStoreInterface;
}
