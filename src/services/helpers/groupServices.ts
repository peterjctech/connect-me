export const groupSummaryPartial: any[] = [
    {
        $project: {
            _id: 0,
            group_id: "$_id",
            name: 1,
            group_image: 1,
            restriction: 1,
            members: 1,
            my_member_status: { $filter: { input: "$members", as: "m", cond: { $eq: ["$$auth_id", "$$m.user_id"] } } },
            my_other_user_status: {
                $filter: { input: "$other_users", as: "ou", cond: { $eq: ["$$auth_id", "$$ou.user_id"] } },
            },
        },
    },
    {
        $addFields: {
            members: { $map: { input: "$members", as: "m", in: "$$m.user_id" } },
            my_status: { $concatArrays: ["$my_member_status", "$my_other_user_status"] },
        },
    },
    {
        $project: {
            group_id: 1,
            name: 1,
            group_image: 1,
            member_count: {
                total: { $size: "$members" },
                friends: { $size: { $setIntersection: ["$members", "$$auth_friends"] } },
            },
            my_status: { $first: "$my_status.status" },
            restriction: 1,
        },
    },
];
