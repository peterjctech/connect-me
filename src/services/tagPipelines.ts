import dayjs from "dayjs";
import { Types, PipelineStage } from "mongoose";
import {
    postSummaryPartial,
    getAcceptedFriends,
    concatNames,
    userSummaryPartial,
    groupSummaryPartial,
    getAuthFriends,
    eventSummaryPartial,
} from "./helpers";

export const tagPostsPipeline = (props: { authId: string; tagId: string; skipTimestamp: number }) => {
    const partial = postSummaryPartial();

    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.tagId) } },
        { $project: { _id: 0, posts: 1, auth_id: new Types.ObjectId(props.authId) } },
        {
            $lookup: {
                from: "posts",
                localField: "posts",
                foreignField: "_id",
                let: { auth_id: "$auth_id" },
                pipeline: [
                    {
                        $match: {
                            created_at: { $lt: dayjs.unix(props.skipTimestamp).toDate() },
                            group_id: undefined,
                            is_public: true,
                        },
                    },
                    ...partial,
                ],
                as: "posts",
            },
        },
        { $unwind: "$posts" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$posts", "$$ROOT"] } } },
        { $project: { posts: 0, auth_id: 0 } },
    ];
    return pipeline;
};

export const tagLayoutDataPipeline = (props: { authId: string; tagId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.tagId) } },
        {
            $project: {
                _id: 0,
                tag_id: "$_id",
                name: 1,
                color: 1,
                users: 1,
                auth_id: new Types.ObjectId(props.authId),
            },
        },
        ...getAuthFriends,
        {
            $addFields: {
                my_status: { $filter: { input: "$users", as: "u", cond: { $eq: ["$auth_id", "$$u"] } } },
                friends: { $setIntersection: ["$auth_friends", "$users"] },
                user_count: { $size: "$users" },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "friends",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, full_name: concatNames } }],
                as: "friends",
            },
        },
        {
            $project: {
                tag_id: 1,
                name: 1,
                color: 1,
                is_added: { $cond: { if: { $eq: ["$my_status", []] }, then: false, else: true } },
                user_count: { $size: "$users" },
                friends: { $map: { input: "$friends", as: "f", in: "$$f.full_name" } },
            },
        },
    ];
    return pipeline;
};

export const tagUsersPipeline = (props: { authId: string; tagId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.tagId) } },
        { $project: { _id: 0, users: 1, auth_id: new Types.ObjectId(props.authId) } },
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
            $project: {
                users: 1,
                auth_friends_list: { $first: "$auth_friends.friends" },
                auth_friends: { $first: "$auth_friends.accepted_friends" },
                auth_id: 1,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "users",
                foreignField: "_id",
                let: { auth_id: "$auth_id", auth_friends: "$auth_friends", auth_friends_list: "$auth_friends_list" },
                pipeline: userSummaryPartial,
                as: "users",
            },
        },
        { $unwind: "$users" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$users", "$$ROOT"] } } },
        { $project: { auth_id: 0, auth_friends_list: 0, users: 0, auth_friends: 0 } },
    ];
    return pipeline;
};

export const tagGroupsPipeline = (props: { authId: string; tagId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.tagId) } },
        { $project: { _id: 0, groups: 1, auth_id: new Types.ObjectId(props.authId) } },
        ...getAuthFriends,
        {
            $lookup: {
                from: "groups",
                localField: "groups",
                foreignField: "_id",
                let: { auth_id: "$auth_id", auth_friends: "$auth_friends" },
                pipeline: groupSummaryPartial,
                as: "groups",
            },
        },
        { $unwind: "$groups" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$groups", "$$ROOT"] } } },
        { $project: { auth_id: 0, auth_friends: 0, groups: 0 } },
    ];
    return pipeline;
};

export const tagEventsPipeline = (props: { authId: string; tagId: string }) => {
    const partial = eventSummaryPartial();

    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.tagId) } },
        { $project: { _id: 0, auth_id: new Types.ObjectId(props.authId), events: 1 } },
        ...getAuthFriends,
        {
            $lookup: {
                from: "events",
                localField: "events",
                foreignField: "_id",
                let: { auth_id: "$auth_id", auth_friends: "$auth_friends" },
                pipeline: partial,
                as: "events",
            },
        },
        { $unwind: "$events" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$events", "$$ROOT"] } } },
        { $project: { auth_id: 0, auth_friends: 0, events: 0 } },
    ];
    return pipeline;
};
