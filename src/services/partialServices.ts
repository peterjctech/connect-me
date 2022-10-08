import { Types } from "mongoose";
import { concatNames, getAcceptedFriends } from "./generalServices";

export const userSummaryPartial: any[] = [
    {
        $project: {
            _id: 0,
            user_id: "$_id",
            full_name: concatNames,
            profile_picture: 1,
            friends: getAcceptedFriends,
        },
    },
    {
        $addFields: {
            mutual_friend_count: {
                $cond: {
                    if: { $eq: ["$$self_id", "$user_id"] },
                    then: "$$REMOVE",
                    else: { $size: { $setIntersection: ["$friends", "$$self_friends"] } },
                },
            },
            is_self: { $cond: { if: { $eq: ["$$self_id", "$user_id"] }, then: true, else: false } },
            is_friend: {
                $switch: {
                    branches: [
                        { case: { $eq: ["$$self_id", "$user_id"] }, then: "$$REMOVE" },
                        { case: { $in: ["$$self_id", "$friends"] }, then: true },
                    ],
                    default: false,
                },
            },
            friendship_status: {
                $filter: { input: "$$self_friends_list", as: "sfl", cond: { $eq: ["$$sfl.user_id", "$user_id"] } },
            },
        },
    },
    {
        $addFields: {
            mutual_friend_count: { $cond: [{ $eq: ["$mutual_friend_count", 0] }, "$$REMOVE", "$mutual_friend_count"] },
            friendship_status: { $first: "$friendship_status.status" },
        },
    },
    { $sort: { is_self: -1, is_friend: -1, mutual_friend_count: -1 } },
    { $project: { friends: 0, is_self: 0, friendships: 0, is_friend: 0 } },
];

export const groupSummaryPartial: any[] = [
    {
        $project: {
            _id: 0,
            group_id: "$_id",
            name: 1,
            group_image: 1,
            restriction: 1,
            members: 1,
            my_member_status: {
                $filter: {
                    input: "$members",
                    as: "m",
                    cond: { $eq: ["$$self_id", "$$m.user_id"] },
                },
            },
            my_other_user_status: {
                $filter: {
                    input: "$other_users",
                    as: "ou",
                    cond: { $eq: ["$$self_id", "$$ou.user_id"] },
                },
            },
        },
    },
    {
        $addFields: {
            members: {
                $map: {
                    input: "$members",
                    as: "m",
                    in: "$$m.user_id",
                },
            },
            my_status: { $concatArrays: ["$my_member_status", "$my_other_user_status"] },
        },
    },
    {
        $addFields: {
            my_status: {
                $first: "$my_status.status",
            },
            friends_in_group: {
                $setIntersection: ["$members", "$$self_friends"],
            },
        },
    },
    {
        $project: {
            group_id: 1,
            restriction: 1,
            name: 1,
            my_status: 1,
            group_image: 1,
            member_count: {
                total: { $size: "$members" },
                friends: { $size: "$friends_in_group" },
            },
        },
    },
];

export const eventSummaryPartial: any[] = [
    {
        $project: {
            _id: 0,
            event_id: "$_id",
            name: 1,
            group_id: { $cond: { if: { $eq: ["$ref_model", "Group"] }, then: "$ref_id", else: "$$REMOVE" } },
            user_id: { $cond: { if: { $eq: ["$ref_model", "User"] }, then: "$ref_id", else: "$$REMOVE" } },
            confirmed_users: {
                $map: {
                    input: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.status", "Yes"] } } },
                    as: "cu",
                    in: "$$cu.user_id",
                },
            },
            datetime: ["$starts_at", "$ends_at"],
            restriction: 1,
            my_status: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.user_id", "$$self_id"] } } },
        },
    },
    {
        $addFields: {
            my_status: { $first: "$my_status.status" },
            confirmed_count: {
                total: { $size: "$confirmed_users" },
                friends: { $size: { $setIntersection: ["$confirmed_users", "$$self_friends"] } },
            },
        },
    },
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            let: { self_id: "$$self_id" },
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        id: "$_id",
                        full_name: concatNames,
                        profile_picture: 1,
                        can_edit: { $cond: { if: { $eq: ["$_id", "$$self_id"] }, then: true, else: false } },
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
            let: { self_id: "$$self_id" },
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        id: "$_id",
                        name: 1,
                        group_image: 1,
                        admins: {
                            $map: {
                                input: {
                                    $filter: { input: "$members", as: "m", cond: { $eq: ["$$m.status", "Admin"] } },
                                },
                                as: "admins",
                                in: "$$admins.user_id",
                            },
                        },
                    },
                },
                {
                    $project: {
                        id: 1,
                        name: 1,
                        group_image: 1,
                        can_edit: { $cond: { if: { $in: ["$$self_id", "$admins"] }, then: true, else: false } },
                    },
                },
            ],
            as: "group",
        },
    },
    {
        $project: {
            event_id: 1,
            user: {
                $cond: {
                    if: { $ne: ["$user", []] },
                    then: {
                        id: { $first: "$user.id" },
                        full_name: { $first: "$user.full_name" },
                        profile_picture: { $first: "$user.profile_picture" },
                    },
                    else: "$$REMOVE",
                },
            },
            group: {
                $cond: {
                    if: { $ne: ["$group", []] },
                    then: {
                        id: { $first: "$group.id" },
                        name: { $first: "$group.name" },
                        group_image: { $first: "$group.group_image" },
                    },
                    else: "$$REMOVE",
                },
            },
            name: 1,
            confirmed_count: 1,
            datetime: 1,
            my_status: 1,
            restriction: 1,
            can_edit: {
                $cond: {
                    if: { $ne: ["$user", []] },
                    then: { $first: "$user.can_edit" },
                    else: { $first: "$group.can_edit" },
                },
            },
        },
    },
];

export const tagSummaryPartial: any[] = [
    {
        $project: {
            _id: 0,
            tag_id: "$_id",
            name: 1,
            color: 1,
            is_added: { $cond: { if: { $in: ["$$self_id", "$users"] }, then: true, else: false } },
        },
    },
];

export const postSummaryPartial = (selfId?: string) => {
    const self = selfId ? new Types.ObjectId(selfId) : "$$self_id";

    const partial: any[] = [
        { $sort: { created_at: -1 } },
        { $limit: 20 },
        { $unwind: "$reactions" },
        {
            $group: {
                _id: {
                    reaction: "$reactions.reaction",
                    post_id: "$_id",
                    author_id: "$author_id",
                    content: "$content",
                    media: "$media",
                    created_at: "$created_at",
                    is_edited: "$is_edited",
                    comments: "$comments",
                    tags: "$tags",
                },
                reactors: { $push: "$reactions.user_id" },
            },
        },
        { $addFields: { reaction_count: { $size: "$reactors" } } },
        { $sort: { reaction_count: -1 } },
        {
            $lookup: {
                from: "users",
                localField: "reactors",
                foreignField: "_id",
                pipeline: [{ $project: { full_name: concatNames } }],
                as: "reactors",
            },
        },
        {
            $addFields: {
                my_reaction: {
                    $cond: [{ $in: [self, "$reactors._id"] }, "$_id.reaction", "$$REMOVE"],
                },
            },
        },
        {
            $group: {
                _id: {
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    comments: "$_id.comments",
                    tags: "$_id.tags",
                },
                reactions: { $push: "$_id.reaction" },
                reactors: { $push: "$reactors" },
                my_reaction: { $mergeObjects: { r: "$my_reaction" } },
            },
        },
        { $unwind: "$reactors" },
        { $unwind: "$reactors" },
        {
            $group: {
                _id: {
                    my_reaction: "$my_reaction.r",
                    reactions: "$reactions",
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    comments: "$_id.comments",
                    comment_count: { $size: "$_id.comments" },
                    tags: "$_id.tags",
                },
                reaction_display: { $push: "$reactors.full_name" },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "reactors",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, full_name: concatNames } }],
                as: "reactors",
            },
        },
        { $unwind: "$_id.comments" },
        { $sort: { "_id.comments.created_at": -1 } },
        {
            $group: {
                _id: {
                    my_reaction: "$_id.my_reaction",
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    tags: "$_id.tags",
                    reaction_display: "$reaction_display",
                    reactions: "$_id.reactions",
                    comment_count: "$_id.comment_count",
                },
                comments: { $push: "$_id.comments" },
            },
        },
        { $addFields: { comments: { $slice: ["$comments", 0, 3] } } },
        { $unwind: "$comments" },
        { $sort: { "comments.created_at": 1 } },
        {
            $lookup: {
                from: "users",
                localField: "comments.author_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1 } }],
                as: "comments.author",
            },
        },
        {
            $addFields: {
                is_liked: { $cond: [{ $in: [self, "$comments.likes"] }, true, false] },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.likes",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, full_name: concatNames } }],
                as: "comments.likes",
            },
        },
        {
            $group: {
                _id: {
                    my_reaction: "$_id.my_reaction",
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    tags: "$_id.tags",
                    reaction_display: "$_id.reaction_display",
                    reactions: "$_id.reactions",
                    comment_count: "$_id.comment_count",
                },
                comments: {
                    $push: {
                        comment_id: "$comments._id",
                        user_id: { $first: "$comments.author.user_id" },
                        full_name: { $first: "$comments.author.full_name" },
                        profile_picture: { $first: "$comments.author.profile_picture" },
                        content: "$comments.content",
                        likes: { $map: { input: "$comments.likes", as: "l", in: "$$l.full_name" } },
                        created_at: "$comments.created_at",
                        is_edited: "$comments.is_edited",
                        is_liked: "$is_liked",
                    },
                },
            },
        },
        {
            $lookup: {
                from: "tags",
                localField: "_id.tags",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, tag_id: "$_id", name: 1 } }],
                as: "_id.tags",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "_id.author_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, id: "$_id", full_name: concatNames, profile_picture: 1 } }],
                as: "_id.author",
            },
        },
        {
            $project: {
                _id: 0,
                post_id: "$_id.post_id",
                author: { $first: "$_id.author" },
                content: "$_id.content",
                media: "$_id.media",
                tags: "$_id.tags",
                reactions: "$_id.reactions",
                my_reaction: "$_id.my_reaction",
                reaction_display: "$_id.reaction_display",
                comment_count: "$_id.comment_count",
                recent_comments: "$comments",
                created_at: "$_id.created_at",
                is_edited: "$_id.is_edited",
                is_mine: { $eq: ["$_id.author_id", self] },
            },
        },
        { $sort: { created_at: -1 } },
    ];
    return partial;
};
