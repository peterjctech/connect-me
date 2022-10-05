export const friendCount = [
    {
        $lookup: {
            from: "friendships",
            localField: "_id",
            foreignField: "sender",
            pipeline: [{ $count: "count" }],
            as: "sender_count",
        },
    },
    {
        $lookup: {
            from: "friendships",
            localField: "_id",
            foreignField: "reciever",
            pipeline: [{ $count: "count" }],
            as: "reciever_count",
        },
    },
    {
        $addFields: {
            friend_count: { $sum: [{ $first: "$reciever_count.count" }, { $first: "$sender_count.count" }] },
        },
    },
];
