import { Resolvers } from "@apollo/client";
import dayjs from "dayjs";
import { Post } from "models";
import { groupPostsPipeline } from "services";
import { getListAndCount, getCreatedAt, getReactionDisplay } from "utils";

const groupResolvers: Resolvers = {
    Query: {
        getGroupPosts: async (_, args, context) => {
            const pipeline = groupPostsPipeline({
                selfId: context.auth,
                groupId: args.groupId,
                isMember: args.isMember,
                skipDate: dayjs.unix(args.skipTimestamp).toDate(),
            });
            let next_skip_timestamp;

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

            const response = { posts, next_skip_timestamp };
            return response;
        },
    },
};

export default groupResolvers;
