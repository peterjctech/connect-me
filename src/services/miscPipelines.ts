import { Types } from "mongoose";
import { concatNames } from "./helpers";

export const newCommentPipeline = (props: { parentId: string; commentId: Types.ObjectId }) => {
    const pipeline = [
        { $match: { _id: new Types.ObjectId(props.parentId) } },
        {
            $project: {
                comment: {
                    $first: { $filter: { input: "$comments", as: "c", cond: { $eq: ["$$c._id", props.commentId] } } },
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "comment.author_id",
                foreignField: "_id",
                pipeline: [{ $project: { profile_picture: 1, full_name: concatNames } }],
                as: "author",
            },
        },
        {
            $project: {
                comment_id: "$_id",
                user_id: { $first: "$author._id" },
                full_name: { $first: "$author.full_name" },
                profile_picture: { $first: "$author.profile_picture" },
                content: "$comment.content",
                likes: "$comment.likes",
                created_at: "$comment.created_at",
            },
        },
        {
            $addFields: {
                is_liked: false,
                is_edited: false,
                is_mine: true,
            },
        },
    ];
    return pipeline;
};
