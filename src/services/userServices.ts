import { UserSummary, GetUserSummaryArgs, GetUserSummaryArgs2 } from "@types";
import { getFullName, getMutualFriends } from "@utils";

interface GetUserDataArgs {}

export const getUserSummary = (user: GetUserSummaryArgs, self: GetUserSummaryArgs2) => {
    let response: UserSummary = {
        user_id: user._id.toString(),
        full_name: getFullName(user),
        profile_picture: user.profile_picture,
    };

    if (self._id.toString() !== user._id.toString()) {
        const userFriends = user.friends.map((obj) => {
            const { first_name, last_name, _id } = obj.user;
            return { id: _id.toString(), first_name, last_name };
        });
        const myFriends = self.friends.map((id) => id.toString());
        const mutual_friends = getMutualFriends(userFriends, myFriends);
        response = { ...response, mutual_friends };
    }

    return response;
};

export const getUserData = (args: GetUserDataArgs) => {};
