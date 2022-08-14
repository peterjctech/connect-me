import { UserModel, UserSummary } from "@types";
import { getFullName, getMutualCount } from "@utils";

export const getUserSummary = (user: UserModel, me: UserModel | null) => {
    const userFriends = user.friends.map((obj) => obj.user_id);
    const response: UserSummary = {
        id: user._id,
        full_name: getFullName(user),
        profile_picture: user.profile_picture,
        mutual_friend_count: getMutualCount(userFriends, me ? me.friends.map((obj) => obj.user_id) : null),
        is_friend: me && userFriends.includes(me._id) ? true : false,
    };
    return response;
};
