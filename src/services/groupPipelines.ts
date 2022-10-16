import dayjs from "dayjs";
import { Types, PipelineStage } from "mongoose";
import { postSummaryPartial, eventSummaryPartial, getAuthFriends, tagSummaryPartial, concatNames } from "./helpers";

export const groupPostsPipeline = (props: {
    authId: string;
    groupId: string;
    isMember: boolean;
    skipTimestamp: number;
}) => {
    let matchFilter: any = {
        group_id: new Types.ObjectId(props.groupId),
        created_at: { $lt: dayjs.unix(props.skipTimestamp).toDate() },
    };
    if (!props.isMember) matchFilter = { ...matchFilter, is_public: true };
    const partial = postSummaryPartial(props.authId);

    const pipeline: any[] = [
        { $match: matchFilter },
        { $addFields: { auth_id: new Types.ObjectId(props.authId) } },
        ...partial,
    ];
    return pipeline;
};

export const groupEventsPipeline = (props: { authId: string; groupId: string; isMember: boolean }) => {
    const partial = eventSummaryPartial(props.authId);

    const pipeline: PipelineStage[] = [
        { $match: { ref_id: new Types.ObjectId(props.groupId) } },
        { $addFields: { auth_id: new Types.ObjectId(props.authId) } },
        ...getAuthFriends,
        ...partial,
    ];
    return pipeline;
};

export const groupTagsPipeline = (props: { authId: string; groupId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.groupId) } },
        { $project: { _id: 0, auth_id: new Types.ObjectId(props.authId), tags: 1 } },
        {
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                let: { auth_id: "$auth_id" },
                pipeline: tagSummaryPartial,
                as: "tags",
            },
        },
        { $unwind: "$tags" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$tags", "$$ROOT"] } } },
        { $project: { tags: 0, auth_id: 0 } },
    ];
    return pipeline;
};

export const groupMembersPipeline = (props: { authId: string; groupId: string }) => {
    const getFilter = (arr: string, status: string) => {
        return {
            $map: {
                input: { $filter: { input: arr, as: "u", cond: { $eq: ["$$u.status", status] } } },
                as: "fm",
                in: "$$fm.user_id",
            },
        };
    };
    const getLookup = (key: string) => {
        return {
            $lookup: {
                from: "users",
                localField: key,
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1 } }],
                as: key,
            },
        };
    };

    const obj = {
        admins: { filter: getFilter("$members", "Admin"), lookup: getLookup("admins") },
        members: { filter: getFilter("$members", "Member"), lookup: getLookup("members") },
        invited: { filter: getFilter("$other_users", "Invited"), lookup: getLookup("invited") },
        requested: { filter: getFilter("$other_users", "RequestedInvite"), lookup: getLookup("requested") },
        banned: { filter: getFilter("$other_users", "Banned"), lookup: getLookup("banned") },
    };
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.groupId) } },
        {
            $project: {
                _id: 0,
                auth_id: new Types.ObjectId(props.authId),
                admins: obj.admins.filter,
                members: obj.members.filter,
                invited: obj.invited.filter,
                requested: obj.requested.filter,
                banned: obj.banned.filter,
            },
        },
        {
            $project: {
                auth_id: 1,
                admins: 1,
                members: 1,
                invited: { $cond: [{ $in: ["$auth_id", "$admins"] }, 1, "$$REMOVE"] },
                requested: { $cond: [{ $in: ["$auth_id", "$admins"] }, 1, "$$REMOVE"] },
                banned: { $cond: [{ $in: ["$auth_id", "$admins"] }, 1, "$$REMOVE"] },
            },
        },
        obj.admins.lookup,
        obj.members.lookup,
        obj.invited.lookup,
        obj.requested.lookup,
        obj.banned.lookup,
        { $project: { auth_id: 0 } },
    ];
    return pipeline;
};

export const groupLayoutDataPipeline = (props: { authId: string; groupId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.groupId) } },
        {
            $project: {
                _id: 0,
                group_id: "$_id",
                owner_id: 1,
                name: 1,
                description: 1,
                group_image: 1,
                member_count: { $size: "$members" },
                created_at: 1,
                restriction: 1,
                auth_id: new Types.ObjectId(props.authId),
                admins: {
                    $map: {
                        input: { $filter: { input: "$members", as: "m", cond: { $eq: ["$$m.status", "Admin"] } } },
                        as: "fu",
                        in: "$$fu.user_id",
                    },
                },
                members: {
                    $map: {
                        input: { $filter: { input: "$members", as: "m", cond: { $eq: ["$$m.status", "Member"] } } },
                        as: "fu",
                        in: "$$fu.user_id",
                    },
                },
            },
        },
        ...getAuthFriends,
        {
            $addFields: {
                is_admin: { $cond: [{ $in: ["$auth_id", "$admins"] }, true, false] },
                is_member: {
                    $cond: {
                        if: { $or: [{ $in: ["$auth_id", "$admins"] }, { $in: ["$auth_id", "$members"] }] },
                        then: true,
                        else: false,
                    },
                },
                member_count: {
                    total: "$member_count",
                    friends: { $size: { $setIntersection: ["$members", "$auth_friends"] } },
                },
            },
        },
        {
            $addFields: {
                is_authorized: {
                    $cond: {
                        if: { $and: [{ $eq: ["$restriction", "Private"] }, { $eq: ["$is_member", false] }] },
                        then: false,
                        else: true,
                    },
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner_id",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1 } }],
                as: "owner",
            },
        },
        {
            $project: {
                group_id: 1,
                owner: { $first: "$owner" },
                name: 1,
                description: 1,
                group_image: 1,
                member_count: 1,
                created_at: 1,
                restriction: 1,
                is_authorized: 1,
                is_admin: 1,
                is_member: 1,
            },
        },
    ];
    return pipeline;
};
