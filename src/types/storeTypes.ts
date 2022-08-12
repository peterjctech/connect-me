import { DirectMessageNotification } from "./conversationTypes";
import { Notification, ColorThemes } from "./miscTypes";

export interface Me {
    id: string;
    full_name: string;
    profile_picture: string;
    notifications: Notification[];
    direct_messages: DirectMessageNotification[];
    theme: ColorThemes;
}

export interface UserStoreInterface extends Me {
    is_initialized: boolean;
}
