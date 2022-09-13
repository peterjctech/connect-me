import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

import { User } from "@models";
import { UserModel, UpdateUserSettingsProps } from "@types";

export const getSettings = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
    const user: UserModel | null = await User.findById(id);
    if (!user) {
        deleteCookie("server-key", { req, res });
        throw new Error("Logged in user does not exist!");
    }

    const privacy = user.preferences.visibility;
    const response: UpdateUserSettingsProps = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        theme: user.preferences.theme,
        color: user.preferences.color,
        friend_visibility: privacy.friends,
        group_visibility: privacy.groups,
        event_visibility: privacy.events,
        post_visibility: privacy.posts,
        new_password: "",
        confirm_new_password: "",
        old_password: "",
    };
    return response;
};
