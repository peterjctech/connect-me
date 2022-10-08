import { Types } from "mongoose";
import { concatNames, getSelfFriends } from "./generalServices";
import { SelfPost } from "./serviceTypes";

export const postPipeline = ({ selfId, postId }: SelfPost) => {
    const pipeline: any[] = [
        { $match: { _id: new Types.ObjectId(postId) } },
        { $addFields: { self_id: new Types.ObjectId(selfId) } },
        ...getSelfFriends,
        {
            $lookup: {
                from: "groups",
                localField: "group_id",
                foreignField: "_id",
                let: { self_id: "$self_id" },
                pipeline: [
                    {
                        $project: { _id: 0, members: { $map: { input: "$members", as: "m", in: "$$m.user_id" } } },
                    },
                    {
                        $project: {
                            is_member: { $cond: { if: { $in: ["$$self_id", "$members"] }, then: true, else: false } },
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
                                { $eq: ["$self_id", "$author_id"] },
                                { $eq: ["$is_public", true] },
                                { $eq: ["$is_group_member", true] },
                                {
                                    $and: [
                                        { $eq: ["$is_group_member", undefined] },
                                        { $in: ["$author_id", "$self_friends"] },
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
                    self_id: new Types.ObjectId(selfId),
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
                my_reaction: {
                    $cond: [{ $in: ["$_id.self_id", "$reactors._id"] }, "$_id.reaction", "$$REMOVE"],
                },
                reactors: {
                    $map: {
                        input: "$reactors",
                        as: "r",
                        in: "$$r.full_name",
                    },
                },
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
                reactions: {
                    $push: {
                        reaction: "$_id.reaction",
                        list: "$reactors",
                    },
                },
                my_reaction: { $mergeObjects: { r: "$my_reaction" } },
            },
        },
        {
            $addFields: {
                "_id.reactions": "$reactions",
            },
        },
        { $unwind: "$reactions" },
        { $unwind: "$reactions.list" },
        {
            $group: {
                _id: {
                    self_id: "$_id.self_id",
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
                "_id.comments.is_liked": { $cond: [{ $in: ["$_id.self_id", "$_id.comments.likes"] }, true, false] },
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
                    self_id: "$_id.self_id",
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
                is_mine: { $eq: ["$_id.author_id", "$_id.self_id"] },
            },
        },
    ];
    return pipeline;
};
