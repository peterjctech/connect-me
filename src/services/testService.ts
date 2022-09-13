import { Types } from "mongoose";
import { User } from "@models";
import { UserSummary, UserModel, UserData, Friend, MainThemes, ColorThemes, UserVisibility } from "@types";
import { getFullName, formatTimestamp, getTooltipList } from "@utils";

interface PopulatedUserModel {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    join_timestamp: number;
    friends: {
        user: UserModel;
        friendship_timestamp: number;
    }[];
    groups: Types.ObjectId[];
    posts: Types.ObjectId[];
    tags: Types.ObjectId[];
    events: Types.ObjectId[];
    conversations: Types.ObjectId[];
    notifications: Notification[];
    preferences: {
        theme: MainThemes;
        color: ColorThemes;
        visibility: UserVisibility;
    };
}

interface GetMutualFriendsProps {
    id: string;
    first_name: string;
    last_name: string;
}

const getMutualFriends = (arr1: GetMutualFriendsProps[], arr2: string[]) => {
    const list = arr1.filter((obj) => arr2.includes(obj.id));
    const names = list.map((obj) => getFullName(obj));
    return { list: getTooltipList(names), count: list.length };
};

const getUserSummary = (user: PopulatedUserModel, self: { id: string; friends: string[] }) => {
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
const getUserData = (user: PopulatedUserModel, self: { id: string; friends: string[] }) => {
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
};

export const testFunction = async (id: string) => {
    console.time("hi2");
    const test2 = await User.findById(id);
    console.timeEnd("hi2");
    console.time("hi");
    const test = await User.findById(id).lean();
    console.timeEnd("hi");
    const user = await User.findById("6320b95f5ae37d45689c1d7a")
        .populate({
            path: "friends.user",
        })
        .select(["friends", "username"]);
    // const me: UserModel | null = await User.findById(id);
    // if (!user || !me) return;
    // const myFriends = me.friends.map((obj) => obj.user.toString());

    // const response = getUserSummary(user, { id: me._id.toString(), friends: myFriends });
    // console.log(response);
};
