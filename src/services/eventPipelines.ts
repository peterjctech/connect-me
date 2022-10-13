import { Types, PipelineStage } from "mongoose";
import { concatNames, getAcceptedFriends, userSummaryPartial } from "./helpers";

export const eventPipeline = (props: { authId: string; eventId: string }) => {
    const pipeline: any[] = [
        { $match: { _id: new Types.ObjectId(props.eventId) } },
        {
            $project: {
                _id: 0,
                event_id: "$_id",
                user_id: { $cond: [{ $eq: ["$ref_model", "User"] }, "$ref_id", "$$REMOVE"] },
                group_id: { $cond: [{ $eq: ["$ref_model", "Group"] }, "$ref_id", "$$REMOVE"] },
                name: 1,
                description: 1,
                datetime: ["$starts_at", "$ends_at"],
                auth_id: new Types.ObjectId(props.authId),
                tags: 1,
                created_at: 1,
                reactions: 1,
                comments: 1,
                users: 1,
                restriction: 1,
            },
        },
        {
            $addFields: {
                my_status: {
                    $first: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.user_id", "$auth_id"] } } },
                },
            },
        },
        { $project: { users: 0 } },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                let: { auth_id: "$auth_id" },
                pipeline: [
                    {
                        $project: {
                            full_name: concatNames,
                            profile_picture: 1,
                            my_friendship: {
                                $first: {
                                    $filter: {
                                        input: "$friends",
                                        as: "f",
                                        cond: { $eq: ["$$f.user_id", "$$auth_id"] },
                                    },
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
                let: { auth_id: "$auth_id" },
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            group_image: 1,
                            my_status: {
                                $first: {
                                    $filter: {
                                        input: "$members",
                                        as: "m",
                                        cond: { $eq: ["$$m.user_id", "$$auth_id"] },
                                    },
                                },
                            },
                        },
                    },
                ],
                as: "group",
            },
        },
        { $addFields: { user: { $first: "$user" }, group: { $first: "$group" }, my_status: "$my_status.status" } },
        {
            $addFields: {
                is_authorized: {
                    $cond: {
                        if: {
                            $or: [
                                { $ne: [{ $ifNull: ["$my_status", ""] }, ""] },
                                { $eq: ["$restriction", "Open"] },
                                {
                                    $and: [
                                        { $eq: ["$user.my_friendship.status", "Accepted"] },
                                        { $eq: ["$restriction", "Restricted"] },
                                    ],
                                },
                                {
                                    $and: [
                                        { $eq: ["$group.my_status.status", "Admin"] },
                                        { $eq: ["$restriction", "Restricted"] },
                                    ],
                                },
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        { $match: { is_authorized: true } },
        {
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, tag_id: "$_id", name: 1 } }],
                as: "tags",
            },
        },
        { $unwind: "$reactions" },
        {
            $group: {
                _id: {
                    reaction: "$reactions.reaction",
                    event_id: "$event_id",
                    name: "$name",
                    description: "$description",
                    tags: "$tags",
                    comments: "$comments",
                    created_at: "$created_at",
                    restriction: "$restriction",
                    datetime: "$datetime",
                    user: "$user",
                    group: "$group",
                    action: "$action",
                    auth_id: "$auth_id",
                    my_status: "$my_status",
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
                my_reaction: { $cond: [{ $in: ["$_id.auth_id", "$reactors._id"] }, "$_id.reaction", "$$REMOVE"] },
            },
        },
        {
            $group: {
                _id: {
                    event_id: "$_id.event_id",
                    name: "$_id.name",
                    description: "$_id.description",
                    tags: "$_id.tags",
                    comments: "$_id.comments",
                    created_at: "$_id.created_at",
                    restriction: "$_id.restriction",
                    user: "$_id.user",
                    group: "$_id.group",
                    action: "$_id.action",
                    auth_id: "$_id.auth_id",
                    datetime: "$_id.datetime",
                    my_status: "$_id.my_status",
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
                    event_id: "$_id.event_id",
                    name: "$_id.name",
                    description: "$_id.description",
                    tags: "$_id.tags",
                    comments: "$_id.comments",
                    created_at: "$_id.created_at",
                    restriction: "$_id.restriction",
                    user: "$_id.user",
                    group: "$_id.group",
                    action: "$_id.action",
                    auth_id: "$_id.auth_id",
                    datetime: "$_id.datetime",
                    my_status: "$_id.my_status",
                },
                reaction_display: { $push: "$reactors.full_name" },
            },
        },
        { $unwind: "$_id.comments" },
        {
            $lookup: {
                from: "users",
                localField: "_id.comments.author_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1 } }],
                as: "_id.comments.author",
            },
        },
        {
            $addFields: {
                "_id.comments.is_liked": { $cond: [{ $in: ["$_id.auth_id", "$_id.comments.likes"] }, true, false] },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "_id.comments.likes",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, full_name: concatNames } }],
                as: "_id.comments.likes",
            },
        },
        { $sort: { "_id.comments.created_at": 1 } },
        {
            $group: {
                _id: {
                    auth_id: "$_id.auth_id",
                    my_reaction: "$_id.my_reaction",
                    reaction_display: "$reaction_display",
                    reactions: "$_id.reactions",
                    event_id: "$_id.event_id",
                    name: "$_id.name",
                    description: "$_id.description",
                    tags: "$_id.tags",
                    comments: "$_id.comments",
                    created_at: "$_id.created_at",
                    restriction: "$_id.restriction",
                    user: "$_id.user",
                    group: "$_id.group",
                    action: "$_id.action",
                    datetime: "$_id.datetime",
                    my_status: "$_id.my_status",
                },
                comments: {
                    $push: {
                        comment_id: "$_id.comments._id",
                        user_id: { $first: "$_id.comments.author.user_id" },
                        full_name: { $first: "$_id.comments.author.full_name" },
                        profile_picture: { $first: "$_id.comments.author.profile_picture" },
                        content: "$_id.comments.content",
                        likes: { $map: { input: "$_id.comments.likes", as: "l", in: "$$l.full_name" } },
                        created_at: "$_id.comments.created_at",
                        is_edited: "$_id.comments.is_edited",
                        is_liked: "$_id.comments.is_liked",
                    },
                },
            },
        },
        { $unwind: "$comments" },
        { $sort: { "comments.created_at": -1 } },
        {
            $group: {
                _id: {
                    my_reaction: "$_id.my_reaction",
                    reaction_display: "$_id.reaction_display",
                    reactions: "$_id.reactions",
                    event_id: "$_id.event_id",
                    name: "$_id.name",
                    description: "$_id.description",
                    tags: "$_id.tags",
                    created_at: "$_id.created_at",
                    restriction: "$_id.restriction",
                    user: "$_id.user",
                    group: "$_id.group",
                    action: "$_id.action",
                    auth_id: "$_id.auth_id",
                    datetime: "$_id.datetime",
                    my_status: "$_id.my_status",
                },
                comments: { $push: "$comments" },
            },
        },
        {
            $project: {
                _id: 0,
                event_id: "$_id.event_id",
                name: "$_id.name",
                description: "$_id.description",
                datetime: "$_id.datetime",
                user: {
                    $cond: {
                        if: { $eq: [{ $ifNull: ["$_id.user._id", ""] }, ""] },
                        then: "$$REMOVE",
                        else: {
                            id: "$_id.user._id",
                            full_name: "$_id.user.full_name",
                            profile_picture: "$_id.user.profile_picture",
                        },
                    },
                },
                group: {
                    $cond: {
                        if: { $eq: [{ $ifNull: ["$_id.group._id", ""] }, ""] },
                        then: "$$REMOVE",
                        else: { id: "$_id.group._id", name: "$_id.group.name", group_image: "$_id.group.group_image" },
                    },
                },
                action: "$_id.action",
                tags: "$_id.tags",
                created_at: "$_id.created_at",
                reactions: "$_id.reactions",
                reaction_display: "$_id.reaction_display",
                my_reaction: "$_id.my_reaction",
                my_status: "$_id.my_status",
                comments: "$comments",
            },
        },
    ];
    return pipeline;
};

export const eventReactionsPipeline = (props: { authId: string; eventId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.eventId) } },
        { $project: { _id: 0, reactions: 1, auth_id: new Types.ObjectId(props.authId) } },
        {
            $lookup: {
                from: "users",
                localField: "auth_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, accepted_friends: getAcceptedFriends, friends: 1 } }],
                as: "auth_friends",
            },
        },
        {
            $addFields: {
                auth_friends: { $first: "$auth_friends.accepted_friends" },
                auth_friends_list: { $first: "$auth_friends.friends" },
            },
        },
        { $unwind: "$reactions" },
        {
            $group: {
                _id: {
                    auth_id: "$auth_id",
                    auth_friends: "$auth_friends",
                    auth_friends_list: "$auth_friends_list",
                    reaction: "$reactions.reaction",
                },
                reactors: { $push: "$reactions.user_id" },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "reactors",
                foreignField: "_id",
                let: {
                    auth_friends: "$_id.auth_friends",
                    auth_id: "$_id.auth_id",
                    auth_friends_list: "$_id.auth_friends_list",
                },
                pipeline: userSummaryPartial,
                as: "reactors",
            },
        },
        { $addFields: { reaction_count: { $size: "$reactors" } } },
        { $sort: { reaction_count: -1 } },
        {
            $group: {
                _id: 0,
                reactions: { $push: { type: "$_id.reaction", users: "$reactors", count: "$reaction_count" } },
            },
        },
        { $unwind: "$reactions" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$reactions", "$$ROOT"] } } },
        { $project: { _id: 0, reactions: 0 } },
    ];
    return pipeline;
};

export const eventCommentLikesPipeline = (props: { authId: string; eventId: string; commentId: string }) => {
    const pipeline = [
        { $match: { _id: new Types.ObjectId(props.eventId) } },
        { $project: { _id: 0, comments: 1, auth_id: new Types.ObjectId(props.authId) } },
        {
            $lookup: {
                from: "users",
                localField: "auth_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, accepted_friends: getAcceptedFriends, friends: 1 } }],
                as: "auth",
            },
        },
        {
            $project: {
                auth_id: 1,
                auth_friends: { $first: "$auth.accepted_friends" },
                auth_friends_list: { $first: "$auth.friends" },
                comments: 1,
            },
        },
        { $unwind: "$comments" },
        { $match: { "comments._id": new Types.ObjectId(props.commentId) } },
        {
            $lookup: {
                from: "users",
                localField: "comments.likes",
                foreignField: "_id",
                let: { auth_id: "$auth_id", auth_friends: "$auth_friends", auth_friends_list: "$auth_friends_list" },
                pipeline: userSummaryPartial,
                as: "likes",
            },
        },
        { $unwind: "$likes" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$likes", "$$ROOT"] } } },
        { $project: { likes: 0, auth_id: 0, auth_friends: 0, comments: 0, auth_friends_list: 0 } },
    ];
    return pipeline;
};

export const eventUsersPipeline = (props: { authId: string; eventId: string }) => {
    const getFilter = (status: string) => {
        return {
            $map: {
                input: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.status", status] } } },
                as: "fu",
                in: "$$fu.user_id",
            },
        };
    };
    const getLookup = (key: string) => {
        return {
            $lookup: {
                from: "users",
                localField: key,
                foreignField: "_id",
                let: { auth_id: "$auth_id", auth_friends: "$auth_friends", auth_friends_list: "$auth_friends_list" },
                pipeline: userSummaryPartial,
                as: key,
            },
        };
    };

    const obj = {
        yes: { filter: getFilter("Yes"), lookup: getLookup("yes") },
        maybe: { filter: getFilter("Maybe"), lookup: getLookup("maybe") },
        no: { filter: getFilter("No"), lookup: getLookup("no") },
        invited: { filter: getFilter("Invited"), lookup: getLookup("invited") },
    };

    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.eventId) } },
        { $project: { _id: 0, users: 1, auth_id: new Types.ObjectId(props.authId) } },
        {
            $lookup: {
                from: "users",
                localField: "auth_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, auth_friends_list: "$friends", auth_friends: getAcceptedFriends } }],
                as: "auth",
            },
        },
        {
            $project: {
                auth_id: 1,
                auth_friends: { $first: "$auth.auth_friends" },
                auth_friends_list: { $first: "$auth.auth_friends_list" },
                yes: obj.yes.filter,
                maybe: obj.maybe.filter,
                no: obj.no.filter,
                invited: obj.invited.filter,
            },
        },
        obj.yes.lookup,
        obj.maybe.lookup,
        obj.no.lookup,
        obj.invited.lookup,
        { $project: { auth_id: 0, auth_friends: 0, auth_friends_list: 0 } },
    ];
    return pipeline;
};

export const eventSettingsPipeline = (props: { eventId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.eventId) } },
        { $project: { _id: 0, starts_at: 1, ends_at: 1, restriction: 1 } },
    ];
    return pipeline;
};
