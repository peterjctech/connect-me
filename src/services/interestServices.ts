import { InterestModel, InterestSummary, UserModel } from "@types";

export const getInterestSummary = (interest: InterestModel, me: UserModel | null) => {
    const response: InterestSummary = {
        id: interest._id,
        interest: interest.interest,
        color: interest.color,
        is_added: me && interest.user_list.includes(me._id) ? true : false,
    };
    return response;
};
