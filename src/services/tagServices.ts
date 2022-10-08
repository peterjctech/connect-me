import { Types, PipelineStage } from "mongoose";
import { SelfTagSkip } from "./serviceTypes";
import { postSummaryPartial } from "./partialServices";
import { getSelfFriends } from "./generalServices";

export const tagPostsPipeline = ({ selfId, tagId, skipDate }: SelfTagSkip) => {
    const partial = postSummaryPartial();

    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(tagId) } },
        { $project: { _id: 0, posts: 1, self_id: new Types.ObjectId(selfId) } },
        ...getSelfFriends,
        {
            $lookup: {
                from: "posts",
                localField: "posts",
                foreignField: "_id",
                let: { self_id: "$self_id", self_friends: "$self_friends" },
                pipeline: [
                    {
                        $addFields: {
                            is_authorized: {
                                $cond: {
                                    if: {
                                        $or: [{ $eq: ["$is_public", true] }, { $in: ["$author_id", "$$self_friends"] }],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    },
                    {
                        $match: { created_at: { $lt: skipDate }, group_id: undefined, is_authorized: true },
                    },
                    ...partial,
                ],
                as: "posts",
            },
        },
        { $unwind: "$posts" },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$posts", "$$ROOT"] } } },
        { $project: { posts: 0, self_id: 0, self_friends: 0 } },
    ];
    return pipeline;
};
