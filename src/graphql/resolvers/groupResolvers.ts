import dayjs from "dayjs";
import { Resolvers } from "@apollo/client";
import { Post, Group, Event, User } from "models";
import { getListAndCount, getCreatedAt, getReactionDisplay, formatDate, formatDatetime } from "utils";
import {
    groupPostsPipeline,
    groupLayoutDataPipeline,
    groupEventsPipeline,
    groupMembersPipeline,
    groupTagsPipeline,
    exploreGroupsPipeline,
    exploreGroupsPrepipeline,
} from "services";

const groupResolvers: Resolvers = {
    Query: {
        getGroupLayoutData: async (_, args, context) => {
            const pipeline = groupLayoutDataPipeline({ authId: context.auth, groupId: args.groupId });
            const response = await Group.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                return { ...data[0], created_at: formatDate(data[0].created_at) };
            });
            return response;
        },
        getGroupPosts: async (_, args, context) => {
            let next_skip_timestamp = dayjs().unix();
            const pipeline = groupPostsPipeline({
                authId: context.auth,
                groupId: args.groupId,
                skipTimestamp: args.skipTimestamp,
                isMember: args.isMember,
            });

            const posts = await Post.aggregate(pipeline).then((data) => {
                if (data.length > 0) next_skip_timestamp = data[data.length - 1].created_at;
                return data.map((post) => {
                    return {
                        ...post,
                        created_at: getCreatedAt(post.created_at),
                        recent_comments: post.recent_comments.map((obj: any) => {
                            return {
                                ...obj,
                                created_at: getCreatedAt(obj.created_at),
                                likes: getListAndCount(obj.likes),
                            };
                        }),
                        reaction_display: getReactionDisplay(post.reaction_display),
                    };
                });
            });

            return { posts, next_skip_timestamp };
        },
        getGroupMembers: async (_, args, context) => {
            const pipeline = groupMembersPipeline({ authId: context.auth, groupId: args.groupId });
            const response = await Group.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                return data[0];
            });
            return response;
        },
        getGroupEvents: async (_, args, context) => {
            const pipeline = groupEventsPipeline({
                authId: context.auth,
                groupId: args.groupId,
                isMember: args.isMember,
            });
            const response = await Event.aggregate(pipeline).then((data) => {
                return data.map((event) => {
                    return { ...event, datetime: formatDatetime(event.datetime) };
                });
            });
            return response;
        },
        getGroupTags: async (_, args, context) => {
            const pipeline = groupTagsPipeline({ authId: context.auth, groupId: args.groupId });
            const response = await Group.aggregate(pipeline);
            return response;
        },
        exploreGroups: async (_, args, context) => {
            const prePipeline = exploreGroupsPrepipeline(context.auth);
            const { friends, groups } = await User.aggregate(prePipeline).then((data) => data[0]);
            const pipeline = exploreGroupsPipeline({
                authId: context.auth,
                authFriends: friends,
                authGroups: groups,
                skipNumber: args.skipNumber,
            });
            const response = await Group.aggregate(pipeline);
            return response;
        },
    },
};

export default groupResolvers;
