import dayjs from "dayjs";
import { Resolvers } from "@apollo/client";
import { Event, User } from "models";
import { getListAndCount, getCreatedAt, getReactionDisplay, calculateEventDatetime, formatDatetime } from "utils";
import {
    eventReactionsPipeline,
    eventPipeline,
    eventCommentLikesPipeline,
    eventSettingsPipeline,
    eventUsersPipeline,
    exploreEventsPipeline,
    exploreEventsPrepipeline,
} from "services";

const eventResolvers: Resolvers = {
    Query: {
        getEvent: async (_, args, context) => {
            const pipeline = eventPipeline({ authId: context.auth, eventId: args.eventId });
            const response = await Event.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                return {
                    ...data[0],
                    datetime: calculateEventDatetime(data[0].datetime),
                    created_at: getCreatedAt(data[0].created_at),
                    comments: data[0].comments.map((comment: any) => {
                        return {
                            ...comment,
                            likes: getListAndCount(comment.likes),
                            created_at: getCreatedAt(comment.created_at),
                        };
                    }),
                    reaction_display: getReactionDisplay(data[0].reaction_display),
                };
            });
            return response;
        },
        getEventReactions: async (_, args, context) => {
            const pipeline = eventReactionsPipeline({ authId: context.auth, eventId: args.eventId });
            const response = await Event.aggregate(pipeline);
            return response;
        },
        getEventCommentLikes: async (_, args, context) => {
            const pipeline = eventCommentLikesPipeline({
                authId: context.auth,
                eventId: args.eventId,
                commentId: args.commentId,
            });
            const response = await Event.aggregate(pipeline);
            return response;
        },
        getEventUsers: async (_, args, context) => {
            const pipeline = eventUsersPipeline({ authId: context.auth, eventId: args.eventId });
            const response = await Event.aggregate(pipeline).then((data) => data[0]);
            return response;
        },
        getEventSettings: async (_, args, context) => {
            const pipeline = eventSettingsPipeline({ eventId: args.eventId });
            const response = await Event.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                return {
                    ...data[0],
                    starts_at: dayjs(data[0].starts_at).unix(),
                    ends_at: data[0].ends_at ? dayjs(data[0].ends_at).unix() : undefined,
                };
            });
            return response;
        },
        exploreEvents: async (_, args, context) => {
            const prePipeline = exploreEventsPrepipeline(context.auth);
            const { friends, events } = await User.aggregate(prePipeline).then((data) => data[0]);
            const pipeline = exploreEventsPipeline({
                authEvents: events,
                authFriends: friends,
                skipNumber: args.skipNumber,
            });
            const response = await Event.aggregate(pipeline).then((data) => {
                return data.map((event) => {
                    return { ...event, datetime: formatDatetime(event.datetime) };
                });
            });
            return response;
        },
    },
};

export default eventResolvers;
