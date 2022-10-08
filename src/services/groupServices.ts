import { Types } from "mongoose";
import { SelfGroupMemberSkip } from "./serviceTypes";
import { postSummaryPartial } from "./partialServices";
import { getSelfFriends } from "./generalServices";

export const groupPostsPipeline = ({ selfId, groupId, isMember, skipDate }: SelfGroupMemberSkip) => {
    let matchFilter: any = {
        group_id: new Types.ObjectId(groupId),
        created_at: { $lt: skipDate },
    };
    if (!isMember) matchFilter = { ...matchFilter, is_public: true };
    const partial = postSummaryPartial(selfId);

    const pipeline: any[] = [
        { $match: matchFilter },
        { $addFields: { self_id: new Types.ObjectId(selfId) } },
        ...getSelfFriends,
        ...partial,
    ];
    return pipeline;
};
