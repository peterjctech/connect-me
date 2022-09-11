import { Types } from "mongoose";
import { ColorThemes, MainThemes } from "./enumTypes";

export interface UserStoreData {
    user_id: string | Types.ObjectId;
    full_name: string;
    profile_picture: string;
    theme: MainThemes | "";
    color: ColorThemes | "";
}

export interface UserStoreInterface extends UserStoreData {
    is_initialized: boolean;
}

export interface StoreInterface {
    user: UserStoreInterface;
}
