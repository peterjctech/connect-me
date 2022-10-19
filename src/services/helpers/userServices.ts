import { concatNames, getAcceptedFriends } from "./generalServices";

export const userSummaryPartial: any[] = [
    { $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1, friends: getAcceptedFriends } },
    {
        $addFields: {
            mutual_friend_count: {
                $cond: {
                    if: { $eq: ["$$auth_id", "$user_id"] },
                    then: "$$REMOVE",
                    else: { $size: { $setIntersection: ["$friends", "$$auth_friends"] } },
                },
            },
            is_self: { $cond: { if: { $eq: ["$$auth_id", "$user_id"] }, then: true, else: false } },
            is_friend: {
                $switch: {
                    branches: [
                        { case: { $eq: ["$$auth_id", "$user_id"] }, then: "$$REMOVE" },
                        { case: { $in: ["$$auth_id", "$friends"] }, then: true },
                    ],
                    default: false,
                },
            },
            friendship_status: {
                $filter: { input: "$$auth_friends_list", as: "afl", cond: { $eq: ["$$afl.user_id", "$user_id"] } },
            },
        },
    },
    {
        $addFields: {
            friendship_status: { $first: "$friendship_status.status" },
        },
    },
    { $sort: { is_self: -1, is_friend: -1, friendship_status: -1, mutual_friend_count: -1 } },
    {
        $project: {
            friends: 0,
            is_self: 0,
            friendships: 0,
            is_friend: 0,
        },
    },
];
