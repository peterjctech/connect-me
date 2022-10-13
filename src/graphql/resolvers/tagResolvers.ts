import dayjs from "dayjs";
import { Resolvers } from "@apollo/client";
import { Tag, User } from "models";
import { getListAndCount, getCreatedAt, getReactionDisplay, formatDatetime } from "utils";
import {
    tagPostsPipeline,
    tagLayoutDataPipeline,
    tagEventsPipeline,
    tagGroupsPipeline,
    tagUsersPipeline,
    exploreTagsPipeline,
    exploreTagsPrepipeline,
} from "services";

const tagResolvers: Resolvers = {
    Query: {
        getTagPosts: async (_, args, context) => {
            let next_skip_timestamp = dayjs().unix();
            const pipeline = tagPostsPipeline({
                authId: context.auth,
                skipTimestamp: args.skipTimestamp,
                tagId: args.tagId,
            });

            const posts = await Tag.aggregate(pipeline).then((data) => {
                if (data.length > 0) next_skip_timestamp = dayjs(data[data.length - 1].created_at).unix();
                return data.map((post) => {
                    return {
                        ...post,
                        created_at: getCreatedAt(post.created_at),
                        recent_comments: post.recent_comments.map((comment: any) => {
                            return {
                                ...comment,
                                created_at: getCreatedAt(comment.created_at),
                                likes: getListAndCount(comment.likes),
                            };
                        }),
                        reaction_display: getReactionDisplay(post.reaction_display),
                    };
                });
            });

            return { posts, next_skip_timestamp };
        },
        getTagLayoutData: async (_, args, context) => {
            const pipeline = tagLayoutDataPipeline({ authId: context.auth, tagId: args.tagId });
            const response = await Tag.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                return { ...data[0], friends: getListAndCount(data[0].friends) };
            });
            return response;
        },
        getTagUsers: async (_, args, context) => {
            const pipeline = tagUsersPipeline({ authId: context.auth, tagId: args.tagId });
            const response = await Tag.aggregate(pipeline);
            return response;
        },
        getTagGroups: async (_, args, context) => {
            const pipeline = tagGroupsPipeline({ authId: context.auth, tagId: args.tagId });
            const response = await Tag.aggregate(pipeline);
            return response;
        },
        getTagEvents: async (_, args, context) => {
            const pipeline = tagEventsPipeline({ authId: context.auth, tagId: args.tagId });
            const response = await Tag.aggregate(pipeline).then((data) => {
                return data.map((event) => {
                    return { ...event, datetime: formatDatetime(event.datetime) };
                });
            });
            return response;
        },
        exploreTags: async (_, args, context) => {
            const prePipeline = exploreTagsPrepipeline(context.auth);
            const authTags = await User.aggregate(prePipeline).then((data) => data[0].tags);
            const pipeline = exploreTagsPipeline({ authTags, skipNumber: args.skipNumber });
            const response = await Tag.aggregate(pipeline);
            return response;
        },
    },
};

export default tagResolvers;
