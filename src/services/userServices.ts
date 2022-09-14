import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

import { User } from "@models";
import { UserModel, UpdateUserSettingsProps, UserData, UserSummary, GetUserSummaryArgs, GetUserDataArgs } from "@types";
import { getFullName, formatTimestamp, getMutualFriends } from "@utils";

export const getUserSummary = (user: GetUserSummaryArgs, self: { id: string; friends: string[] }) => {
    const friends = user.friends.map((obj) => {
        const { _id, first_name, last_name } = obj.user;
        return { id: _id.toString(), first_name, last_name, timestamp: obj.friendship_timestamp };
    });

    const response: UserSummary = {
        user_id: user._id.toString(),
        full_name: getFullName(user),
        profile_picture: user.profile_picture,
        mutual_friends: self.id !== user._id.toString() ? getMutualFriends(friends, self.friends) : undefined,
    };
    return response;
};

export const getUserData = (user: GetUserDataArgs, self: { id: string; friends: string[] }) => {
    const friends = user.friends.map((obj) => {
        const { _id, first_name, last_name } = obj.user;
        return { id: _id.toString(), first_name, last_name, timestamp: obj.friendship_timestamp };
    });
    const friendStatus = friends.find((obj) => obj.id === self.id);
    const response: UserData = {
        user_id: user._id.toString(),
        full_name: getFullName(user),
        profile_picture: user.profile_picture,
        join_date: formatTimestamp(user.join_timestamp, "date"),
        friendship_date: friendStatus ? formatTimestamp(friendStatus.timestamp, "shortdate") : undefined,
        mutual_friends: self.id !== user._id.toString() ? getMutualFriends(friends, self.friends) : undefined,
    };
    return response;
};

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
