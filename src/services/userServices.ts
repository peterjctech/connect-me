import { User } from "@models";
import { FriendSummary, PopulatedUser, UserData, UserModel, UserSummary, ProfileData, Visibility } from "@types";
import { formatTimestamp, getFullName, getMutualCount } from "@utils";
import { Types } from "mongoose";
import { getEventSummary } from "./eventServices";
import { getGroupSummary } from "./groupServices";
import { getInterestSummary } from "./interestServices";
import { getPostSummary } from "./postServices";

interface Friend {
    user: UserModel;
    friendship_timestamp: number;
}

export const getMe = async (id: string | null) => {
    const me: UserModel | null = id ? await User.findById(id) : null;
    return me;
};

export const getUserSummary = (user: UserModel, me: UserModel | null) => {
    const userFriends = user.friends.map((obj) => obj.user);

    const response: UserSummary = {
        id: user._id,
        full_name: getFullName(user),
        profile_picture: user.profile_picture,
        mutual_friend_count: getMutualCount(userFriends, me ? me.friends.map((obj) => obj.user) : null),
        is_friend: me && userFriends.includes(me._id) ? true : false,
    };
    return response;
};

export const getFriendSummary = (friend: Friend, myFriends: Types.ObjectId[]) => {
    const response: FriendSummary = {
        id: friend.user._id,
        full_name: getFullName(friend.user),
        profile_picture: friend.user.profile_picture,
        mutual_friend_count: getMutualCount(
            friend.user.friends.map((obj) => obj.user._id),
            myFriends
        ),
        friendship_date: formatTimestamp(friend.friendship_timestamp, "fulldate"),
    };
    return response;
};

export const getUserData = (user: PopulatedUser, me: UserModel | null) => {
    const userFriends = user.friends.map((obj) => obj.user._id);
    const isFriend = me && userFriends.includes(me._id) ? true : false;
    const myFriends = me ? me.friends.map((obj) => obj.user) : null;

    const checkCanView = (pref: Visibility) => {
        if (pref === "Nobody") return false;
        if (pref === "Everyone") return true;
        if (pref === "Friends Only") {
            if (isFriend) return true;
            return false;
        }
    };
    const privacy = {
        friends: checkCanView(user.preferences.visibility.friends),
        groups: checkCanView(user.preferences.visibility.groups),
        events: checkCanView(user.preferences.visibility.events),
        interests: checkCanView(user.preferences.visibility.interests),
        posts: checkCanView(user.preferences.visibility.posts),
    };

    const viewable = {
        friends: privacy.friends
            ? user.friends
            : user.friends.filter((obj) => {
                  myFriends?.includes(obj.user._id);
              }),
        groups: privacy.groups
            ? user.groups
            : user.groups.filter((obj) => {
                  me?.groups.includes(obj._id);
              }),
        interests: privacy.interests
            ? user.interests
            : user.interests.filter((obj) => {
                  me?.interests.includes(obj._id);
              }),
        events: privacy.events
            ? user.events
            : user.events.filter((obj) => {
                  me?.events.includes(obj._id);
              }),
    };

    const response: UserData = {
        id: user._id,
        full_name: getFullName(user),
        profile_picture: user.profile_picture,
        join_date: formatTimestamp(user.join_timestamp, "fulldate"),
        is_friend: isFriend,
        friends: viewable.friends.map((obj) => getUserSummary(obj.user, me)),
        mutual_friend_count: getMutualCount(userFriends, myFriends),
        friend_count: privacy.friends ? user.friends.length : undefined,
        groups: viewable.groups.map((obj) => getGroupSummary(obj, me)),
        group_count: privacy.groups ? user.groups.length : undefined,
        mutual_group_count: me
            ? getMutualCount(
                  user.groups.map((obj) => obj._id),
                  me.groups
              )
            : 0,
        posts: privacy.posts ? user.posts.map((obj) => getPostSummary(obj, me)) : undefined,
        mutual_interest_count: me
            ? getMutualCount(
                  user.interests.map((obj) => obj._id),
                  me.interests
              )
            : 0,
        interests: viewable.interests.map((obj) => getInterestSummary(obj, me ? me._id : null)),
        events: viewable.events.map((obj) => getEventSummary(obj, me ? me._id : null)),
    };
    return response;
};

export const getProfileData = (me: PopulatedUser, model: UserModel) => {
    const myFriends = me.friends.map((obj) => obj.user._id);

    const response: ProfileData = {
        id: me._id,
        full_name: getFullName(me),
        profile_picture: me.profile_picture,
        join_date: formatTimestamp(me.join_timestamp, "fulldate"),
        friends: me.friends.map((obj) => getFriendSummary(obj, myFriends)),
        friend_count: me.friends.length,
        groups: me.groups.map((obj) => getGroupSummary(obj, model)),
        group_count: me.groups.length,
        posts: me.posts.map((obj) => getPostSummary(obj, model)),
        interests: me.interests.map((obj) => getInterestSummary(obj, me._id)),
        interest_count: me.interests.length,
        events: me.events.map((obj) => getEventSummary(obj, me._id)),
        event_count: me.events.length,
    };
    return response;
};
