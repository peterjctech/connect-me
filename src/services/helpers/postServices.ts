import { Types } from "mongoose";
import { concatNames } from "./generalServices";

export const postSummaryPartial = (authId?: string) => {
    const auth = authId ? new Types.ObjectId(authId) : "$$auth_id";

    const partial: any[] = [
        {
            $sort: {
                created_at: -1,
            },
        },
        {
            $limit: 20,
        },
        {
            $unwind: "$reactions",
        },
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
        {
            $addFields: {
                reaction_count: {
                    $size: "$reactors",
                },
            },
        },
        {
            $sort: {
                reaction_count: -1,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "reactors",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            full_name: concatNames,
                        },
                    },
                ],
                as: "reactors",
            },
        },
        {
            $addFields: {
                my_reaction: {
                    $cond: [{ $in: [auth, "$reactors._id"] }, "$_id.reaction", "$$REMOVE"],
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
                is_liked: { $cond: [{ $in: [auth, "$comments.likes"] }, true, false] },
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
                        is_mine: { $eq: [auth, { $first: "$comments.author.user_id" }] },
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
                pipeline: [{ $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1 } }],
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
                is_mine: { $eq: ["$_id.author_id", auth] },
            },
        },
        { $sort: { created_at: -1 } },
    ];
    return partial;
};
