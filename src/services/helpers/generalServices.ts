export const concatNames = { $concat: ["$first_name", " ", "$last_name"] };
export const getAge = { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } };
export const getAcceptedFriends = {
    $map: {
        input: { $filter: { input: "$friends", as: "af", cond: { $eq: ["$$af.status", "Accepted"] } } },
        as: "ff",
        in: "$$ff.user_id",
    },
};
export const getAuthFriends = [
    {
        $lookup: {
            from: "users",
            localField: "auth_id",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 0, friends: getAcceptedFriends } }],
            as: "auth_friends",
        },
    },
    { $addFields: { auth_friends: { $first: "$auth_friends.friends" } } },
];
