import dayjs from "dayjs";
import { Resolvers } from "@apollo/client";
import { User, Chat } from "models";
import { formatRelativeDate, getList, getListAndCount, formatDatetime } from "utils";
import { chatsPipeline, chatPipeline, moreChatMessagesPipeline } from "services";

const chatResolvers: Resolvers = {
    Query: {
        getChats: async (_, __, context) => {
            const pipeline = chatsPipeline({ authId: context.auth });
            const response = await User.aggregate(pipeline).then((data) => {
                return data.map((chat) => {
                    return {
                        ...chat,
                        last_message: { ...chat.last_message, sent_at: formatRelativeDate(chat.last_message.sent_at) },
                    };
                });
            });
            return response;
        },
        getChatData: async (_, args, context) => {
            let next_skip_timestamp = dayjs().unix();
            const pipeline = chatPipeline({ authId: context.auth, chatId: args.chatId });

            const chat = await Chat.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                next_skip_timestamp = dayjs(data[0].messages[0].sent_at).unix();
                return {
                    ...data[0],
                    read_users: getList(data[0].read_users),
                    members: getListAndCount(data[0].members),
                    messages: data[0].messages.map((message: any) => {
                        const format =
                            dayjs(message.sent_at).unix() < dayjs().startOf("day").unix() ? "M/D/YY" : "HH:mm A";
                        return { ...message, sent_at: dayjs(message.sent_at).format(format) };
                    }),
                };
            });
            return { ...chat, next_skip_timestamp };
        },
        getMoreChatMessages: async (_, args, context) => {
            let next_skip_timestamp = dayjs().unix();
            const pipeline = moreChatMessagesPipeline({
                authId: context.auth,
                chatId: args.chatId,
                skipTimestamp: args.skipTimestamp,
            });
            const messages = await Chat.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                next_skip_timestamp = dayjs(data[0].sent_at).unix();
                return data.map((chat) => {
                    return { ...chat, sent_at: formatDatetime(chat.sent_at) };
                });
            });
            return { messages, next_skip_timestamp };
        },
    },
};

export default chatResolvers;
