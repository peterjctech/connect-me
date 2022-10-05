import { PipelineStage, Types } from "mongoose";
import { friendCount } from "./generalServices";

type Self = { selfId: string };

export const getUserSettingsPipeline = ({ selfId }: Self) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(selfId) } },
        {
            $project: {
                _id: 0,
                username: 1,
                first_name: 1,
                last_name: 1,
                intro: 1,
                theme: "$settings.theme",
                color: "$settings.color",
                default_post_is_public: "$settings.default_post_is_public",
                friend_privacy: "$settings.friend_privacy",
                group_privacy: "$settings.group_privacy",
                event_privacy: "$settings.event_privacy",
            },
        },
    ];
    return pipeline;
};

export const initializeStorePipeline = ({ selfId }: Self) => {
    const pipeline: PipelineStage[] = [
        { $match: { _id: new Types.ObjectId(selfId) } },
        ...friendCount,
        {
            $project: {
                _id: 0,
                user_id: "$_id",
                profile_picture: 1,
                joined_at: 1,
                intro: 1,
                theme: "$settings.theme",
                birthday: 1,
                age: { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } },
                color: "$settings.color",
                full_name: { $concat: ["$first_name", " ", "$last_name"] },
                friend_count: 1,
            },
        },
    ];
    return pipeline;
};
