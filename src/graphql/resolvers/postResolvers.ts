import { Resolvers } from "@apollo/client";
import { Post, User } from "@models";
import { UserModel, ReactionModel, CommentModel, PopulatedPostModel } from "@types";
import { Types } from "mongoose";
import { getPostData } from "@services";

interface TestModel {
    _id: Types.ObjectId;
    author: UserModel;
    group?: Types.ObjectId;
    content: string;
    picture?: string;
    tags: Types.ObjectId[];
    reactions: ReactionModel[];
    comments: CommentModel[];
    created_timestamp: number;
    is_edited: boolean;
}

const postResolvers: Resolvers = {
    Query: {
        getPosts: async (_, args, context) => {
            const params = args.type === "User" ? { author: args.id } : { group: args.id };
            const me = await User.findById(context.auth);
            const posts: PopulatedPostModel[] = await Post.find(params)
                .populate([
                    { path: "group", select: "name" },
                    { path: "author", select: ["first_name", "last_name", "profile_picture"] },
                    { path: "reactions.user", select: ["first_name", "last_name"] },
                    { path: "tags", select: ["name"] },
                    {
                        path: "comments",
                        select: ["content", "created_timestamp", "is_edited"],
                        populate: [
                            { path: "author", select: ["first_name", "last_name", "profile_picture"] },
                            { path: "likes", select: ["first_name", "last_name"] },
                        ],
                    },
                ])
                .select(["content", "picture", "reactions.reaction", "created_timestamp", "is_edited"])
                .lean();
            const response = posts
                .sort((a, b) => b.created_timestamp - a.created_timestamp)
                .map((post) => getPostData(post, me._id.toString()));
            return response;
        },
    },
};

export default postResolvers;
