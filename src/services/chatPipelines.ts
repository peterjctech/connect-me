import dayjs from "dayjs";
import { PipelineStage, Types } from "mongoose";
import { concatNames } from "./helpers";

export const chatsPipeline = (props: { authId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.authId) } },
        { $project: { _id: 0, chats: 1 } },
        {
            $lookup: {
                from: "chats",
                localField: "chats",
                foreignField: "_id",
                pipeline: [
                    { $project: { _id: 0, chat_id: "$_id", title: 1, messages: 1 } },
                    { $unwind: "$messages" },
                    { $sort: { "messages.sent_at": -1 } },
                    {
                        $group: {
                            _id: { title: "$title", chat_id: "$chat_id" },
                            messages: { $push: "$messages" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            title: "$_id.title",
                            chat_id: "$_id.chat_id",
                            last_message: { $first: "$messages" },
                        },
                    },
                ],
                as: "chats",
            },
        },
        { $unwind: "$chats" },
        {
            $lookup: {
                from: "users",
                localField: "chats.last_message.sender",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, profile_picture: 1 } }],
                as: "sender",
            },
        },
        {
            $project: {
                chat_id: "$chats.chat_id",
                title: "$chats.title",
                last_message: {
                    profile_picture: { $first: "$sender.profile_picture" },
                    message: "$chats.last_message.content",
                    sent_at: "$chats.last_message.sent_at",
                },
            },
        },
        { $sort: { "last_message.sent_at": -1 } },
    ];
    return pipeline;
};

export const moreChatMessagesPipeline = (props: { authId: string; chatId: string; skipTimestamp: number }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.chatId) } },
        { $unwind: "$messages" },
        { $sort: { "messages.sent_at": -1 } },
        { $match: { "messages.sent_at": { $lt: dayjs.unix(props.skipTimestamp).toDate() } } },
        { $limit: 10 },
        { $project: { _id: 0, message: "$messages" } },
        {
            $lookup: {
                from: "users",
                localField: "message.sender",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 0, user_id: "$_id", full_name: concatNames, profile_picture: 1 } }],
                as: "user",
            },
        },
        { $addFields: { user: { $first: "$user" } } },
        {
            $project: {
                message_id: "$message._id",
                user_id: "$user.user_id",
                full_name: "$user.full_name",
                profile_picture: "$user.profile_picture",
                sent_at: "$message.sent_at",
                message: "$message.content",
                is_mine: { $cond: [{ $eq: ["$user.user_id", new Types.ObjectId(props.authId)] }, true, false] },
            },
        },
        { $sort: { sent_at: 1 } },
    ];
    return pipeline;
};

export const chatPipeline = (props: { authId: string; chatId: string }) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(props.chatId) } },
        {
            $project: {
                _id: 0,
                chat_id: "$_id",
                title: 1,
                read_users: {
                    $map: {
                        input: { $filter: { input: "$members", as: "m", cond: { $eq: ["$$m.is_read", true] } } },
                        as: "fm",
                        in: "$$fm.user_id",
                    },
                },
                members: { $map: { input: "$members", as: "m", in: "$$m.user_id" } },
                messages: 1,
                auth_id: new Types.ObjectId(props.authId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "read_users",
                foreignField: "_id",
                let: { auth_id: "$auth_id" },
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: { $cond: { if: { $eq: ["$_id", "$$auth_id"] }, then: "You", else: "$first_name" } },
                        },
                    },
                ],
                as: "read_users",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "members",
                foreignField: "_id",
                let: { auth_id: "$auth_id" },
                pipeline: [{ $project: { _id: 0, full_name: concatNames } }],
                as: "members",
            },
        },
        {
            $addFields: {
                read_users: { $map: { input: "$read_users", as: "ru", in: "$$ru.name" } },
                members: { $map: { input: "$members", as: "m", in: "$$m.full_name" } },
            },
        },
        { $unwind: "$messages" },
        { $sort: { sent_at: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "users",
                let: { auth_id: "$auth_id" },
                foreignField: "_id",
                localField: "messages.sender",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            full_name: concatNames,
                            profile_picture: 1,
                            is_mine: { $cond: [{ $eq: ["$$auth_id", "$_id"] }, true, false] },
                        },
                    },
                ],
                as: "sender",
            },
        },
        { $addFields: { sender: { $first: "$sender" } } },
        {
            $project: {
                chat_id: 1,
                title: 1,
                read_users: 1,
                members: 1,
                message: {
                    user_id: "$messages.sender",
                    full_name: "$sender.full_name",
                    profile_picture: "$sender.profile_picture",
                    sent_at: "$messages.sent_at",
                    message: "$messages.content",
                    is_mine: "$sender.is_mine",
                },
            },
        },
        { $sort: { "message.sent_at": 1 } },
        {
            $group: {
                _id: { chat_id: "$chat_id", title: "$title", read_users: "$read_users", members: "$members" },
                messages: { $push: "$message" },
            },
        },
        {
            $project: {
                _id: 0,
                chat_id: "$_id.chat_id",
                title: "$_id.title",
                read_users: "$_id.read_users",
                members: "$_id.members",
                messages: "$messages",
            },
        },
    ];
    return pipeline;
};
