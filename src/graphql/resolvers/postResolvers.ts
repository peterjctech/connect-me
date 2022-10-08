import { Resolvers } from "@apollo/client";
import { Post } from "models";
import { postPipeline } from "services";
import { getListAndCount, getCreatedAt, getReactionDisplay, getTooltipList } from "utils";

const postResolvers: Resolvers = {
    Query: {
        getPost: async (_, args, context) => {
            const pipeline = postPipeline({
                selfId: context.auth,
                postId: args.postId,
            });
            const response = await Post.aggregate(pipeline).then((data) => {
                if (data[0]) {
                    return {
                        ...data[0],
                        created_at: getCreatedAt(data[0].created_at),
                        comments: data[0].comments.map((obj: any) => {
                            return {
                                ...obj,
                                created_at: getCreatedAt(obj.created_at),
                                likes: getListAndCount(obj.likes),
                            };
                        }),
                        reaction_display: getReactionDisplay(data[0].reaction_display),
                        reactions: data[0].reactions.map((obj: any) => {
                            return { ...obj, list: getTooltipList(obj.list) };
                        }),
                    };
                }
                return null;
            });
            return response;
        },
    },
};

export default postResolvers;
