import dayjs from "dayjs";
import { Types } from "mongoose";
import { Resolvers } from "@apollo/client";
import { Post, User } from "models";
import { getListAndCount, getCreatedAt, getReactionDisplay, getTooltipList } from "utils";
import {
    postPipeline,
    postReactionsPipeline,
    postCommentLikesPipeline,
    morePostCommentsPipeline,
    feedPipeline,
    feedPrepipeline,
    newCommentPipeline,
} from "services";

const postResolvers: Resolvers = {
    Query: {
        getPost: async (_, args, context) => {
            const pipeline = postPipeline({ authId: context.auth, postId: args.postId });
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
        getPostReactions: async (_, args, context) => {
            const pipeline = postReactionsPipeline({ authId: context.auth, postId: args.postId });
            const response = await Post.aggregate(pipeline);
            return response;
        },
        getPostCommentLikes: async (_, args, context) => {
            const pipeline = postCommentLikesPipeline({
                authId: context.auth,
                postId: args.postId,
                commentId: args.commentId,
            });
            const response = await Post.aggregate(pipeline);
            return response;
        },
        getMorePostComments: async (_, args, context) => {
            let next_skip_timestamp = dayjs().unix();
            const pipeline = morePostCommentsPipeline({
                authId: context.auth,
                postId: args.postId,
                skipTimestamp: args.skipTimestamp,
            });

            const comments = await Post.aggregate(pipeline).then((data) => {
                return data.map((comment) => {
                    return {
                        ...comment,
                        likes: getListAndCount(comment.likes),
                        created_at: getCreatedAt(comment.created_at),
                    };
                });
            });

            return { comments, next_skip_timestamp };
        },
        getFeed: async (_, args, context) => {
            let next_skip_timestamp = dayjs().unix();
            const prePipeline = feedPrepipeline(context.auth);
            const friends = await User.aggregate(prePipeline).then((data) => data[0].friends);
            const pipeline = feedPipeline({
                authId: context.auth,
                authFriends: friends,
                skipTimestamp: args.skipTimestamp,
            });

            const posts = await Post.aggregate(pipeline).then((data) => {
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
    },
    Mutation: {
        likePostComment: async (_, args, context) => {
            await Post.updateOne(
                { _id: new Types.ObjectId(args.postId), "comments._id": new Types.ObjectId(args.commentId) },
                { $addToSet: { "comments.$.likes": new Types.ObjectId(context.auth) } }
            );
            return { message: "Liked comment" };
        },
        unlikePostComment: async (_, args, context) => {
            await Post.updateOne(
                { _id: new Types.ObjectId(args.postId), "comments._id": new Types.ObjectId(args.commentId) },
                { $pull: { "comments.$.likes": new Types.ObjectId(context.auth) } }
            );
            return { message: "Unliked comment" };
        },
        deletePostComment: async (_, args) => {
            await Post.updateOne(
                { _id: new Types.ObjectId(args.postId) },
                {
                    $pull: {
                        comments: {
                            _id: new Types.ObjectId(args.commentId),
                        },
                    },
                }
            );
            return { message: "Deleted comment" };
        },
        commentOnPost: async (_, args, context) => {
            const newCommentId = new Types.ObjectId();
            await Post.updateOne(
                { _id: new Types.ObjectId(args.postId) },
                { $push: { comments: { _id: newCommentId, author_id: context.auth, content: args.content } } }
            );
            const pipeline = newCommentPipeline({ parentId: args.postId, commentId: newCommentId });
            const response = await Post.aggregate(pipeline).then((data) => {
                return {
                    ...data[0],
                    likes: getListAndCount(data[0].likes),
                    created_at: getCreatedAt(data[0].created_at),
                };
            });
            return response;
        },
    },
};

export default postResolvers;
