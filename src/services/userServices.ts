import { PipelineStage, Types } from "mongoose";
import { concatNames, getAcceptedFriends, getSelfFriends } from "./generalServices";
import {
    tagSummaryPartial,
    userSummaryPartial,
    groupSummaryPartial,
    eventSummaryPartial,
    postSummaryPartial,
} from "./partialServices";
import { Self, SelfUser, SelfUserFriendPrivacy, SelfUserFriendSkip } from "./serviceTypes";

export const initializeStorePipeline = ({ selfId }: Self) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(selfId) } },
        {
            $project: {
                _id: 0,
                user_id: "$_id",
                profile_picture: 1,
                joined_at: 1,
                intro: 1,
                theme: "$settings.theme",
                birthday: 1,
                age: { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } },
                color: "$settings.color",
                full_name: concatNames,
                friend_count: {
                    $size: {
                        $filter: {
                            input: "$friends",
                            as: "f",
                            cond: { $eq: ["$$f.status", "Accepted"] },
                        },
                    },
                },
            },
        },
    ];
    return pipeline;
};

export const userSettingsPipeline = ({ selfId }: Self) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(selfId) } },
        {
            $project: {
                _id: 0,
                username: 1,
                first_name: 1,
                last_name: 1,
                profile_picture: 1,
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

export const userLayoutDataPipeline = ({ selfId, userId }: SelfUser) => {
    const pipeline: PipelineStage[] = [
        {
            $facet: {
                user: [
                    { $match: { _id: new Types.ObjectId(userId) } },
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
                            age: { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } },
                            event_privacy: "$settings.event_privacy",
                            group_privacy: "$settings.group_privacy",
                            friend_privacy: "$settings.friend_privacy",
                        },
                    },
                ],
                self: [{ $match: { _id: new Types.ObjectId(selfId) } }, { $project: { friends: 1 } }],
            },
        },
        {
            $project: {
                user: { $first: "$user" },
                self_id: { $first: "$self._id" },
                self_friends: { $first: "$self.friends" },
            },
        },
        {
            $addFields: {
                friendship_status: {
                    $first: {
                        $filter: { input: "$self_friends", as: "sf", cond: { $eq: ["$user.user_id", "$$sf.user_id"] } },
                    },
                },
                self_friends: {
                    $map: {
                        input: {
                            $filter: { input: "$self_friends", as: "sf", cond: { $eq: ["$$sf.status", "Accepted"] } },
                        },
                        as: "af",
                        in: "$$af.user_id",
                    },
                },
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
                                    { $eq: ["$self_id", "$user.user_id"] },
                                    {
                                        $and: [
                                            { $eq: ["$user.friend_privacy", "FriendsOnly"] },
                                            { $in: ["$self_id", "$user.friends"] },
                                        ],
                                    },
                                ],
                            },
                            then: { $size: "$user.friends" },
                            else: "$$REMOVE",
                        },
                    },
                    mutual: { $size: { $setIntersection: ["$user.friends", "$self_friends"] } },
                },
                friendship_status: "$friendship_status.status",
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

export const userFriendsPipeline = ({ selfId, userId, isFriend, privacy }: SelfUserFriendPrivacy) => {
    let filter: PipelineStage[] = [];

    if (userId !== selfId) {
        if (privacy === "Private") {
            filter = [
                {
                    $addFields: {
                        friends: { $cond: { if: { $in: ["$self_id", "$friends"] }, then: ["$self_id"], else: [] } },
                    },
                },
            ];
        } else if (privacy === "ShowMutual" || (privacy === "FriendsOnly" && !isFriend)) {
            filter = [
                { $addFields: { self_friends: { $concatArrays: ["$self_friends", ["$self_id"]] } } },
                { $addFields: { friends: { $setIntersection: ["$friends", "$self_friends"] } } },
            ];
        }
    }

    const pipeline: PipelineStage[] = [
        {
            $facet: {
                self: [{ $match: { _id: new Types.ObjectId(selfId) } }, { $project: { friends: 1 } }],
                user: [
                    { $match: { _id: new Types.ObjectId(userId) } },
                    { $project: { _id: 0, friends: getAcceptedFriends } },
                ],
            },
        },
        {
            $project: {
                self_id: { $first: "$self._id" },
                self_friends_list: { $first: "$self.friends" },
                friends: { $first: "$user.friends" },
            },
        },
        {
            $addFields: {
                self_friends: {
                    $map: {
                        input: {
                            $filter: {
                                input: "$self_friends_list",
                                as: "sfl",
                                cond: { $eq: ["$$sfl.status", "Accepted"] },
                            },
                        },
                        as: "sf",
                        in: "$$sf.user_id",
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
                let: { self_id: "$self_id", self_friends: "$self_friends", self_friends_list: "$self_friends_list" },
                pipeline: userSummaryPartial,
                as: "friends",
            },
        },
        { $unwind: "$friends" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$friends", "$$ROOT"] } } },
        { $project: { self_friends_list: 0, self_friends: 0, friends: 0, self_id: 0 } },
    ];
    return pipeline;
};

export const userGroupsPipeline = ({ selfId, userId, isFriend, privacy }: SelfUserFriendPrivacy) => {
    let filter: PipelineStage[] = [];

    if (userId !== selfId) {
        if (privacy === "Private") {
            filter = [{ $addFields: { groups: [] } }];
        } else if (privacy === "ShowMutual" || (privacy === "FriendsOnly" && !isFriend)) {
            filter = [{ $addFields: { groups: { $setIntersection: ["$self_groups", "$groups"] } } }];
        }
    }

    const pipeline: PipelineStage[] = [
        {
            $facet: {
                self: [
                    { $match: { _id: new Types.ObjectId(selfId) } },
                    { $project: { friends: getAcceptedFriends, groups: 1 } },
                ],
                user: [{ $match: { _id: new Types.ObjectId(userId) } }, { $project: { _id: 0, groups: 1 } }],
            },
        },
        {
            $project: {
                self_id: { $first: "$self._id" },
                self_friends: { $first: "$self.friends" },
                self_groups: { $first: "$self.groups" },
                groups: { $first: "$user.groups" },
            },
        },
        ...filter,
        {
            $lookup: {
                from: "groups",
                localField: "groups",
                foreignField: "_id",
                let: { self_id: "$self_id", self_friends: "$self_friends" },
                pipeline: groupSummaryPartial,
                as: "groups",
            },
        },
        { $unwind: "$groups" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$groups", "$$ROOT"] } } },
        { $project: { self_friends: 0, groups: 0, self_id: 0, self_groups: 0 } },
        { $sort: { "member_count.friends": -1 } },
    ];
    return pipeline;
};

export const userTagsPipeline = ({ selfId, userId }: SelfUser) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(userId) } },
        { $project: { _id: 0, tags: 1 } },
        {
            $lookup: {
                from: "tags",
                foreignField: "_id",
                localField: "tags",
                let: { self_id: new Types.ObjectId(selfId) },
                pipeline: tagSummaryPartial,
                as: "tags",
            },
        },
        { $unwind: "$tags" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$tags", "$$ROOT"] } } },
        { $project: { tags: 0 } },
        { $sort: { is_added: -1 } },
    ];
    return pipeline;
};

export const userPostsPipeline = ({ selfId, userId, isFriend, skipDate }: SelfUserFriendSkip) => {
    let matchFilter: any = {
        author_id: new Types.ObjectId(userId),
        group_id: undefined,
        created_at: { $lt: skipDate },
    };
    if (!isFriend) matchFilter = { ...matchFilter, is_public: true };

    const partial = postSummaryPartial(selfId);

    const pipeline: any[] = [
        { $match: matchFilter },
        { $addFields: { self_id: new Types.ObjectId(selfId) } },
        ...getSelfFriends,
        ...partial,
    ];
    return pipeline;
};

export const userEventsPipeline = ({ selfId, userId, isFriend, privacy }: SelfUserFriendPrivacy) => {
    let filter: PipelineStage[] = [];

    if (userId !== selfId) {
        if (privacy === "Private") {
            filter = [{ $addFields: { events: [] } }];
        } else if (privacy === "ShowMutual" || (privacy === "FriendsOnly" && !isFriend)) {
            filter = [{ $addFields: { events: { $setIntersection: ["$events", "$self_events"] } } }];
        }
    }
    const pipeline: PipelineStage[] = [
        {
            $facet: {
                user: [{ $match: { _id: new Types.ObjectId(userId) } }, { $project: { _id: 0, events: 1 } }],
                self: [
                    { $match: { _id: new Types.ObjectId(selfId) } },
                    { $project: { friends: getAcceptedFriends, events: 1 } },
                ],
            },
        },
        {
            $project: {
                self_id: { $first: "$self._id" },
                self_friends: { $first: "$self.friends" },
                self_events: { $first: "$self.events" },
                events: { $first: "$user.events" },
            },
        },
        ...filter,
        {
            $lookup: {
                from: "events",
                localField: "events",
                foreignField: "_id",
                let: { self_id: "$self_id", self_friends: "$self_friends" },
                pipeline: eventSummaryPartial,
                as: "events",
            },
        },
        { $unwind: "$events" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$events", "$$ROOT"] } } },
        { $project: { self_id: 0, self_events: 0, self_friends: 0, events: 0 } },
    ];

    return pipeline;
};
