import { Types, PipelineStage } from "mongoose";
import { getAcceptedFriends, concatNames } from "./helpers";

export const exploreUsersPrepipeline = (authId: string) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(authId) } },
        { $project: { _id: 0, friends: { $map: { input: "$friends", as: "f", in: "$$f.user_id" } } } },
    ];
    return pipeline;
};
export const exploreUsersPipeline = (props: { authId: string; authFriends: string[]; skipNumber: number }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: { $nin: props.authFriends } } },
        { $sort: { first_name: 1, last_name: 1 } },
        { $skip: props.skipNumber },
        { $limit: 100 },
        { $project: { friends: getAcceptedFriends, profile_picture: 1, full_name: concatNames } },
        {
            $project: {
                _id: 0,
                user_id: "$_id",
                profile_picture: 1,
                full_name: 1,
                mutual_friend_count: { $size: { $setIntersection: ["$friends", props.authFriends] } },
            },
        },
    ];
    return pipeline;
};

export const exploreTagsPrepipeline = (authId: string) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(authId) } },
        { $project: { _id: 0, tags: 1 } },
    ];
    return pipeline;
};
export const exploreTagsPipeline = (props: { authTags: string[]; skipNumber: number }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: { $nin: props.authTags } } },
        { $sort: { name: 1 } },
        { $skip: props.skipNumber },
        { $limit: 100 },
        { $project: { _id: 0, tag_id: "$_id", name: 1, color: 1 } },
        { $addFields: { is_added: false } },
    ];
    return pipeline;
};

export const exploreEventsPrepipeline = (authId: string) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(authId) } },
        { $project: { _id: 0, events: 1, friends: getAcceptedFriends } },
    ];
    return pipeline;
};
export const exploreEventsPipeline = (props: { authEvents: string[]; authFriends: string[]; skipNumber: number }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: { $nin: props.authEvents }, restriction: "Open" } },
        { $sort: { name: 1 } },
        { $skip: props.skipNumber },
        { $limit: 100 },
        {
            $project: {
                _id: 0,
                event_id: "$_id",
                user_id: { $cond: [{ $eq: ["$ref_model", "User"] }, "$ref_id", "$$REMOVE"] },
                group_id: { $cond: [{ $eq: ["$ref_model", "Group"] }, "$ref_id", "$$REMOVE"] },
                name: 1,
                confirmed_users: {
                    $map: {
                        input: { $filter: { input: "$users", as: "u", cond: { $eq: ["$$u.status", "Yes"] } } },
                        as: "fu",
                        in: "$$fu.user_id",
                    },
                },
                datetime: "$starts_at",
            },
        },
        {
            $addFields: {
                confirmed_count: {
                    total: { $size: "$confirmed_users" },
                    friends: { $size: { $setIntersection: ["$confirmed_users", props.authFriends] } },
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                pipeline: [{ $project: { full_name: concatNames, profile_picture: 1 } }],
                as: "user",
            },
        },
        {
            $lookup: {
                from: "groups",
                localField: "group_id",
                foreignField: "_id",
                pipeline: [{ $project: { name: 1, group_image: 1 } }],
                as: "group",
            },
        },
        {
            $project: {
                event_id: 1,
                picture: {
                    $cond: {
                        if: { $eq: ["$group", []] },
                        then: { $first: "$user.profile_picture" },
                        else: { $first: "$group.group_image" },
                    },
                },
                reference_name: {
                    $cond: {
                        if: { $eq: ["$group", []] },
                        then: { $first: "$user.full_name" },
                        else: { $first: "$group.name" },
                    },
                },
                user_id: 1,
                group_id: 1,
                name: 1,
                confirmed_count: 1,
                datetime: 1,
            },
        },
    ];
    return pipeline;
};

export const exploreGroupsPrepipeline = (authId: string) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(authId) } },
        { $project: { _id: 0, friends: getAcceptedFriends, groups: 1 } },
    ];
    return pipeline;
};

export const exploreGroupsPipeline = (props: {
    authId: string;
    authFriends: string[];
    authGroups: string[];
    skipNumber: number;
}) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: { $nin: props.authGroups }, restriction: { $ne: "Private" } } },
        { $sort: { name: 1 } },
        { $skip: props.skipNumber },
        { $limit: 100 },
        {
            $project: {
                name: 1,
                group_image: 1,
                members: { $map: { input: "$members", as: "m", in: "$$m.user_id" } },
                restriction: 1,
                other_status: {
                    $filter: {
                        input: "$other_users",
                        as: "u",
                        cond: { $eq: ["$$u.user_id", props.authId] },
                    },
                },
                member_status: {
                    $filter: {
                        input: "$members",
                        as: "m",
                        cond: { $eq: ["$$m.user_id", props.authId] },
                    },
                },
            },
        },
        {
            $addFields: {
                member_count: {
                    total: { $size: "$members" },
                    friends: { $size: { $setIntersection: ["$members", props.authFriends] } },
                },
                my_status: {
                    $switch: {
                        branches: [
                            {
                                case: { $ne: ["$member_status", []] },
                                then: { $first: "$member_status.status" },
                            },
                            {
                                case: { $ne: ["$other_status", []] },
                                then: { $first: "$other_status.status" },
                            },
                        ],
                        default: "$$REMOVE",
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                group_id: "$_id",
                name: 1,
                group_image: 1,
                member_count: 1,
                restriction: 1,
                my_status: 1,
            },
        },
    ];
    return pipeline;
};
