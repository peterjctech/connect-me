import { InterestModel, InterestSummary } from "@types";
import { Types } from "mongoose";

export const getInterestSummary = (interest: InterestModel, myId: Types.ObjectId | null) => {
    const response: InterestSummary = {
        id: interest._id,
        name: interest.name,
        color: interest.color,
        is_added: myId && interest.user_list.includes(myId) ? true : false,
    };
    return response;
};
