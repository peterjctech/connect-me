import { Types } from "mongoose";
import { Reaction } from "@types";

export const getFullName = (user: any) => {
    if (!user.first_name || !user.last_name) {
        throw new Error("User does not have a valid first and/or last name");
    } else {
        return `${user.first_name} ${user.last_name}`;
    }
};

export const getMutualCount = (arr1: Types.ObjectId[] | null, arr2: Types.ObjectId[] | null) => {
    if (!arr2 || !arr1) return 0;
    return arr1.filter((id) => arr2.includes(id)).length;
};

export const getReactionList = (
    reactions: { user: Types.ObjectId; reaction: Reaction; reaction_timestamp: number }[]
) => {
    const reactionTypes: Reaction[] = ["Love", "Angry", "Like", "Wow", "Sad"];
    const reactionCounts: { reaction: Reaction; count: number }[] = [];

    const getReactionCount = (reaction: Reaction) => {
        return reactions.filter((obj) => obj.reaction === reaction).length;
    };

    reactionTypes.forEach((reaction) => reactionCounts.push({ reaction, count: getReactionCount(reaction) }));
    const reaction_list = reactionCounts

        .sort((a, b) => b.count - a.count)
        .map((obj) => obj.reaction)
        .slice(0, 3);
    return reaction_list;
};
