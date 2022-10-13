import { Types } from "mongoose";
import { getAcceptedFriends, concatNames } from "./generalServices";

export const eventSummaryPartial = (authId?: string) => {
    const auth = authId ? new Types.ObjectId(authId) : "$$auth_id";
    const authFriends = authId ? "$auth_friends" : "$$auth_friends";

    const pipeline: any[] = [
        {
            $project: {
                _id: 0,
                event_id: "$_id",
                user_id: { $cond: { if: { $eq: ["$ref_model", "User"] }, then: "$ref_id", else: "$$REMOVE" } },
                group_id: { $cond: { if: { $eq: ["$ref_model", "Group"] }, then: "$ref_id", else: "$$REMOVE" } },
                name: 1,
                confirmed_users: {
                    $map: {
                        input: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.status", "Yes"] } } },
                        as: "cu",
                        in: "$$cu.user_id",
                    },
                },
                datetime: "$starts_at",
                restriction: 1,
                my_status: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.user_id", auth] } } },
                auth_friends: authFriends,
            },
        },
        {
            $addFields: {
                my_status: { $first: "$my_status.status" },
                confirmed_count: {
                    total: { $size: "$confirmed_users" },
                    friends: { $size: { $setIntersection: ["$confirmed_users", "$auth_friends"] } },
                },
            },
        },
        { $project: { auth_friends: 0 } },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                let: { auth_id: auth, restriction: "$restriction", my_status: "$my_status" },
                pipeline: [
                    { $project: { _id: 0, profile_picture: 1, friends: getAcceptedFriends, full_name: concatNames } },
                    {
                        $project: {
                            profile_picture: 1,
                            full_name: 1,
                            is_authorized: {
                                $cond: {
                                    if: {
                                        $or: [
                                            { $eq: ["$$restriction", "Open"] },
                                            {
                                                $and: [
                                                    { $eq: ["$$restriction", "Restricted"] },
                                                    { $in: ["$$auth_id", "$friends"] },
                                                ],
                                            },
                                            { $ne: [{ $ifNull: ["$my_status", ""] }, ""] },
                                        ],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    },
                ],
                as: "user",
            },
        },
        {
            $lookup: {
                from: "groups",
                localField: "group_id",
                foreignField: "_id",
                let: { auth_id: auth, restriction: "$restriction", my_status: "$my_status" },
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            group_image: 1,
                            members: { $map: { input: "$members", as: "m", in: "$$m.user_id" } },
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            group_image: 1,
                            is_authorized: {
                                $cond: {
                                    if: {
                                        $or: [
                                            { $eq: ["$$restriction", "Open"] },
                                            {
                                                $and: [
                                                    { $eq: ["$$restriction", "Restricted"] },
                                                    { $in: ["$$auth_id", "$members"] },
                                                ],
                                            },
                                            { $ne: [{ $ifNull: ["$my_status", ""] }, ""] },
                                        ],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    },
                ],
                as: "group",
            },
        },
        {
            $addFields: {
                reference_name: {
                    $cond: {
                        if: { $eq: ["$group", []] },
                        then: { $first: "$user.full_name" },
                        else: { $first: "$group.name" },
                    },
                },
                picture: {
                    $cond: {
                        if: { $eq: ["$group", []] },
                        then: { $first: "$user.profile_picture" },
                        else: { $first: "$group.group_image" },
                    },
                },
                is_authorized: {
                    $cond: {
                        if: { $eq: ["$group", []] },
                        then: { $first: "$user.is_authorized" },
                        else: { $first: "$group.is_authorized" },
                    },
                },
            },
        },
        { $match: { is_authorized: true } },
        {
            $project: {
                event_id: 1,
                user_id: 1,
                group_id: 1,
                name: 1,
                datetime: 1,
                confirmed_count: 1,
                picture: 1,
                my_status: 1,
                reference_name: 1,
            },
        },
    ];
    return pipeline;
};
