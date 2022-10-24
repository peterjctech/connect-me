import dayjs from "dayjs";
import { Types, PipelineStage } from "mongoose";
import { concatNames, getAuthFriends, userSummaryPartial, getAcceptedFriends, postSummaryPartial } from "./helpers";

export const postPipeline = (props: { authId: string; postId: string }) => {
    const pipeline: any[] = [
        { $match: { _id: new Types.ObjectId(props.postId) } },
        { $addFields: { auth_id: new Types.ObjectId(props.authId) } },
        ...getAuthFriends,
        {
            $lookup: {
                from: "groups",
                localField: "group_id",
                foreignField: "_id",
                let: { auth_id: "$auth_id" },
                pipeline: [
                    { $project: { _id: 0, members: { $map: { input: "$members", as: "m", in: "$$m.user_id" } } } },
                    {
                        $project: {
                            is_member: { $cond: { if: { $in: ["$$auth_id", "$members"] }, then: true, else: false } },
                        },
                    },
                ],
                as: "is_group_member",
            },
        },
        { $addFields: { is_group_member: { $first: "$is_group_member.is_member" } } },
        {
            $addFields: {
                is_authorized: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: ["$auth_id", "$author_id"] },
                                { $eq: ["$is_public", true] },
                                { $eq: ["$is_group_member", true] },
                                {
                                    $and: [
                                        { $eq: ["$is_group_member", undefined] },
                                        { $in: ["$author_id", "$auth_friends"] },
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
        { $unwind: "$reactions" },
        {
            $group: {
                _id: {
                    auth_id: "$auth_id",
                    reaction: "$reactions.reaction",
                    post_id: "$_id",
                    author_id: "$author_id",
                    group_id: "$group_id",
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
        {
            $lookup: {
                from: "users",
                localField: "reactors",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, full_name: concatNames } }],
                as: "reactors",
            },
        },
        {
            $addFields: {
                my_reaction: { $cond: [{ $in: ["$_id.self_id", "$reactors._id"] }, "$_id.reaction", "$$REMOVE"] },
                reactors: { $map: { input: "$reactors", as: "r", in: "$$r.full_name" } },
                reaction_count: { $size: "$reactors" },
            },
        },
        { $sort: { reaction_count: -1 } },
        {
            $group: {
                _id: {
                    self_id: "$_id.self_id",
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    group_id: "$_id.group_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    comments: "$_id.comments",
                    tags: "$_id.tags",
                },
                reactions: { $push: { reaction: "$_id.reaction", list: "$reactors" } },
                my_reaction: { $mergeObjects: { r: "$my_reaction" } },
            },
        },
        { $addFields: { "_id.reactions": "$reactions" } },
        { $unwind: "$reactions" },
        { $unwind: "$reactions.list" },
        {
            $group: {
                _id: {
                    auth_id: "$_id.auth_id",
                    my_reaction: "$my_reaction.r",
                    reactions: "$_id.reactions",
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    group_id: "$_id.group_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    comments: "$_id.comments",
                    tags: "$_id.tags",
                },
                reaction_display: { $push: "$reactions.list" },
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
                    post_id: "$_id.post_id",
                    author_id: "$_id.author_id",
                    group_id: "$_id.group_id",
                    content: "$_id.content",
                    media: "$_id.media",
                    created_at: "$_id.created_at",
                    is_edited: "$_id.is_edited",
                    tags: "$_id.tags",
                    reaction_display: "$reaction_display",
                    reactions: "$_id.reactions",
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
                        is_mine: { $eq: [{ $first: "$_id.comments.author.user_id" }, "$_id.auth_id"] },
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
            $lookup: {
                from: "groups",
                localField: "_id.group_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, id: "$_id", name: 1 } }],
                as: "_id.group",
            },
        },
        {
            $project: {
                _id: 0,
                post_id: "$_id.post_id",
                author: { $first: "$_id.author" },
                group: { $first: "$_id.group" },
                content: "$_id.content",
                media: "$_id.media",
                tags: "$_id.tags",
                reactions: "$_id.reactions",
                my_reaction: "$_id.my_reaction",
                reaction_display: "$_id.reaction_display",
                comments: "$comments",
                created_at: "$_id.created_at",
                is_edited: "$_id.is_edited",
                is_mine: { $eq: ["$_id.author_id", "$_id.auth_id"] },
            },
        },
    ];
    return pipeline;
};

export const postReactionsPipeline = (props: { authId: string; postId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.postId) } },
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

export const postCommentLikesPipeline = (props: { authId: string; postId: string; commentId: string }) => {
    const pipeline = [
        { $match: { _id: new Types.ObjectId(props.postId) } },
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

export const morePostCommentsPipeline = (props: { authId: string; postId: string; skipTimestamp: number }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.postId) } },
        { $project: { _id: 0, comments: 1, auth_id: new Types.ObjectId(props.authId) } },
        { $unwind: "$comments" },
        { $match: { "comments.created_at": { $lt: dayjs.unix(props.skipTimestamp).toDate() } } },
        { $sort: { "comments.created_at": -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "users",
                localField: "comments.author_id",
                foreignField: "_id",
                pipeline: [{ $project: { full_name: concatNames, profile_picture: 1 } }],
                as: "author",
            },
        },
        { $addFields: { is_liked: { $cond: [{ $in: ["$auth_id", "$comments.likes"] }, true, false] } } },
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
            $project: {
                comment_id: "$comments._id",
                user_id: { $first: "$author._id" },
                full_name: { $first: "$author.full_name" },
                profile_picture: { $first: "$author.profile_picture" },
                content: "$comments.content",
                likes: { $map: { input: "$comments.likes", as: "cl", in: "$$cl.full_name" } },
                created_at: "$comments.created_at",
                is_liked: 1,
                is_edited: "$comments.is_edited",
                is_mine: { $eq: [{ $first: "$author._id" }, "$auth_id"] },
            },
        },
        { $sort: { created_at: 1 } },
    ];
    return pipeline;
};

export const feedPrepipeline = (authId: string) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(authId) } },
        { $project: { _id: 0, friends: getAcceptedFriends } },
    ];
    return pipeline;
};

export const feedPipeline = (props: { authId: string; authFriends: string[]; skipTimestamp: number }) => {
    const partial = postSummaryPartial(props.authId);

    const pipeline: PipelineStage[] = [
        {
            $match: {
                author_id: { $in: props.authFriends },
                group_id: undefined,
                created_at: { $lt: dayjs.unix(props.skipTimestamp).toDate() },
            },
        },
        ...partial,
    ];
    return pipeline;
};
