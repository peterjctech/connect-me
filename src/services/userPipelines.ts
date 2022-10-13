import dayjs from "dayjs";
import { PipelineStage, Types } from "mongoose";
import { PrivacyOption } from "../types";
import {
    concatNames,
    getAge,
    getAcceptedFriends,
    getAuthFriends,
    postSummaryPartial,
    groupSummaryPartial,
    tagSummaryPartial,
    eventSummaryPartial,
    userSummaryPartial,
} from "./helpers";

export const initializeStorePipeline = (props: { authId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.authId) } },
        {
            $project: {
                _id: 0,
                user_id: "$_id",
                full_name: concatNames,
                profile_picture: 1,
                joined_at: 1,
                intro: 1,
                birthday: 1,
                theme: "$settings.theme",
                color: "$settings.color",
                age: getAge,
                friend_count: {
                    $size: { $filter: { input: "$friends", as: "f", cond: { $eq: ["$$f.status", "Accepted"] } } },
                },
            },
        },
    ];
    return pipeline;
};

export const userSettingsPipeline = (props: { authId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.authId) } },
        {
            $project: {
                _id: 0,
                username: 1,
                first_name: 1,
                last_name: 1,
                intro: 1,
                theme: "$settings.theme",
                color: "$settings.color",
                default_post_is_public: "$settings.default_post_is_public",
                friend_privacy: "$settings.friend_privacy",
                group_privacy: "$settings.group_privacy",
                event_privacy: "$settings.event_privacy",
            },
        },
    ];
    return pipeline;
};

export const userLayoutDataPipeline = (props: { authId: string; userId: string }) => {
    const pipeline: PipelineStage[] = [
        {
            $facet: {
                auth: [{ $match: { _id: new Types.ObjectId(props.authId) } }, { $project: { friends: 1 } }],
                user: [
                    { $match: { _id: new Types.ObjectId(props.userId) } },
                    {
                        $project: {
                            _id: 0,
                            user_id: "$_id",
                            full_name: concatNames,
                            profile_picture: 1,
                            joined_at: 1,
                            friends: getAcceptedFriends,
                            intro: 1,
                            birthday: 1,
                            age: getAge,
                            event_privacy: "$settings.event_privacy",
                            group_privacy: "$settings.group_privacy",
                            friend_privacy: "$settings.friend_privacy",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                user: { $first: "$user" },
                auth_id: { $first: "$auth._id" },
                auth_friends: { $first: "$auth.friends" },
            },
        },
        {
            $addFields: {
                friendship: {
                    $first: {
                        $filter: { input: "$auth_friends", as: "af", cond: { $eq: ["$user.user_id", "$$af.user_id"] } },
                    },
                },
                auth_friends: {
                    $map: {
                        input: {
                            $filter: { input: "$auth_friends", as: "af", cond: { $eq: ["$$af.status", "Accepted"] } },
                        },
                        as: "af",
                        in: "$$af.user_id",
                    },
                },
                is_self: {
                    $cond: {
                        if: {
                            $eq: ["$auth_id", "$user.user_id"],
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $addFields: {
                friendship_status: "$friendship.status",
            },
        },
        {
            $project: {
                user_id: "$user.user_id",
                full_name: "$user.full_name",
                profile_picture: "$user.profile_picture",
                friend_count: {
                    total: {
                        $cond: {
                            if: {
                                $or: [
                                    { $eq: ["$user.friend_privacy", "Everyone"] },
                                    { $eq: ["$auth_id", "$user.user_id"] },
                                    {
                                        $and: [
                                            { $eq: ["$user.friend_privacy", "FriendsOnly"] },
                                            { $in: ["$auth_id", "$user.friends"] },
                                        ],
                                    },
                                ],
                            },
                            then: { $size: "$user.friends" },
                            else: "$$REMOVE",
                        },
                    },
                    mutual: { $size: { $setIntersection: ["$user.friends", "$auth_friends"] } },
                },
                friendship_status: 1,
                joined_at: "$user.joined_at",
                intro: "$user.intro",
                birthday: "$user.birthday",
                age: "$user.age",
                group_privacy: "$user.group_privacy",
                friend_privacy: "$user.friend_privacy",
                event_privacy: "$user.event_privacy",
            },
        },
    ];
    return pipeline;
};

export const userPostsPipeline = (props: {
    authId: string;
    userId: string;
    isFriend: boolean;
    skipTimestamp: number;
}) => {
    let matchFilter: any = {
        author_id: new Types.ObjectId(props.userId),
        group_id: undefined,
        created_at: { $lt: dayjs.unix(props.skipTimestamp).toDate() },
    };
    if (!props.isFriend) matchFilter = { ...matchFilter, is_public: true };

    const partial = postSummaryPartial(props.authId);

    const pipeline: PipelineStage[] = [
        {
            $match: matchFilter,
        },
        {
            $addFields: {
                auth_id: new Types.ObjectId(props.authId),
            },
        },
        ...getAuthFriends,
        ...partial,
    ];
    return pipeline;
};

export const userFriendsPipeline = (props: {
    authId: string;
    userId: string;
    isFriend: boolean;
    privacy: PrivacyOption;
}) => {
    let filter: PipelineStage[] = [];

    if (props.userId !== props.authId) {
        if (props.privacy === "Private") {
            filter = [
                {
                    $addFields: {
                        friends: { $cond: { if: { $in: ["$auth_id", "$friends"] }, then: ["$auth_id"], else: [] } },
                    },
                },
            ];
        } else if (props.privacy === "ShowMutual" || (props.privacy === "FriendsOnly" && !props.isFriend)) {
            filter = [
                { $addFields: { auth_friends: { $concatArrays: ["$auth_friends", ["$auth_id"]] } } },
                { $addFields: { friends: { $setIntersection: ["$friends", "$auth_friends"] } } },
            ];
        }
    }

    const pipeline: PipelineStage[] = [
        {
            $facet: {
                auth: [{ $match: { _id: new Types.ObjectId(props.authId) } }, { $project: { friends: 1 } }],
                user: [
                    { $match: { _id: new Types.ObjectId(props.userId) } },
                    { $project: { _id: 0, friends: getAcceptedFriends } },
                ],
            },
        },
        {
            $project: {
                auth_id: { $first: "$auth._id" },
                auth_friends_list: { $first: "$auth.friends" },
                friends: { $first: "$user.friends" },
            },
        },
        {
            $addFields: {
                auth_friends: {
                    $map: {
                        input: {
                            $filter: {
                                input: "$auth_friends_list",
                                as: "afl",
                                cond: { $eq: ["$$afl.status", "Accepted"] },
                            },
                        },
                        as: "af",
                        in: "$$af.user_id",
                    },
                },
            },
        },
        ...filter,
        {
            $lookup: {
                from: "users",
                localField: "friends",
                foreignField: "_id",
                let: { auth_id: "$auth_id", auth_friends: "$auth_friends", auth_friends_list: "$auth_friends_list" },
                pipeline: userSummaryPartial,
                as: "friends",
            },
        },
        { $unwind: "$friends" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$friends", "$$ROOT"] } } },
        { $project: { auth_friends_list: 0, auth_friends: 0, friends: 0, auth_id: 0 } },
    ];
    return pipeline;
};

export const userGroupsPipeline = (props: {
    authId: string;
    userId: string;
    isFriend: boolean;
    privacy: PrivacyOption;
}) => {
    let filter: PipelineStage[] = [];

    if (props.userId !== props.authId) {
        if (props.privacy === "Private") {
            filter = [{ $addFields: { groups: [] } }];
        } else if (props.privacy === "ShowMutual" || (props.privacy === "FriendsOnly" && !props.isFriend)) {
            filter = [{ $addFields: { groups: { $setIntersection: ["$auth_groups", "$groups"] } } }];
        }
    }

    const pipeline: PipelineStage[] = [
        {
            $facet: {
                auth: [
                    { $match: { _id: new Types.ObjectId(props.authId) } },
                    { $project: { friends: getAcceptedFriends, groups: 1 } },
                ],
                user: [{ $match: { _id: new Types.ObjectId(props.userId) } }, { $project: { _id: 0, groups: 1 } }],
            },
        },
        {
            $project: {
                groups: { $first: "$user.groups" },
                auth_id: { $first: "$auth._id" },
                auth_friends: { $first: "$auth.friends" },
                auth_groups: { $first: "$auth.groups" },
            },
        },
        ...filter,
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
        { $project: { auth_friends: 0, groups: 0, auth_id: 0, auth_groups: 0 } },
        { $sort: { "member_count.friends": -1 } },
    ];
    return pipeline;
};

export const userTagsPipeline = (props: { authId: string; userId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.userId) } },
        { $project: { _id: 0, tags: 1 } },
        {
            $lookup: {
                from: "tags",
                foreignField: "_id",
                localField: "tags",
                let: { auth_id: new Types.ObjectId(props.authId) },
                pipeline: tagSummaryPartial,
                as: "tags",
            },
        },
        { $unwind: "$tags" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$tags", "$$ROOT"] } } },
        { $project: { tags: 0 } },
    ];
    return pipeline;
};

export const userEventsPipeline = (props: {
    authId: string;
    userId: string;
    isFriend: string;
    privacy: PrivacyOption;
}) => {
    let filter: PipelineStage[] = [];

    if (props.userId !== props.authId) {
        if (props.privacy === "Private") {
            filter = [{ $addFields: { events: [] } }];
        } else if (props.privacy === "ShowMutual" || (props.privacy === "FriendsOnly" && !props.isFriend)) {
            filter = [{ $addFields: { events: { $setIntersection: ["$events", "$auth_events"] } } }];
        }
    }

    const partial = eventSummaryPartial();

    const pipeline: PipelineStage[] = [
        {
            $facet: {
                user: [{ $match: { _id: new Types.ObjectId(props.userId) } }, { $project: { _id: 0, events: 1 } }],
                auth: [
                    { $match: { _id: new Types.ObjectId(props.authId) } },
                    { $project: { friends: getAcceptedFriends, events: 1 } },
                ],
            },
        },
        {
            $project: {
                events: { $first: "$user.events" },
                auth_id: { $first: "$auth._id" },
                auth_friends: { $first: "$auth.friends" },
                auth_events: { $first: "$auth.events" },
            },
        },
        ...filter,
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
        { $project: { auth_id: 0, auth_events: 0, auth_friends: 0, events: 0 } },
    ];
    return pipeline;
};
