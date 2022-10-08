export const concatNames = { $concat: ["$first_name", " ", "$last_name"] };

export const getAcceptedFriends = {
    $map: {
        input: { $filter: { input: "$friends", as: "af", cond: { $eq: ["$$af.status", "Accepted"] } } },
        as: "ff",
        in: "$$ff.user_id",
    },
};

export const getSelfFriends = [
    {
        $lookup: {
            from: "users",
            localField: "self_id",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 0, friends: getAcceptedFriends } }],
            as: "self_friends",
        },
    },
    { $addFields: { self_friends: { $first: "$self_friends.friends" } } },
];
