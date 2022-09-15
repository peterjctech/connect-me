import { CommentData, PopulatedCommentModel, Reaction, ReactionDisplay } from "@types";
import { getCreatedAt, getFullName, getTooltipList, reactionEnum } from "@utils";

export const getCommentData = (comment: PopulatedCommentModel) => {
    const author = comment.author;

    const response: CommentData = {
        comment_id: comment.id,
        user_id: author._id.toString(),
        full_name: getFullName(author),
        profile_picture: author.profile_picture,
        content: comment.content,
        likes: {
            list: getTooltipList(comment.likes.map((obj) => getFullName(obj))),
            count: comment.likes.length,
        },
        created_at: getCreatedAt(comment.created_timestamp),
        is_edited: comment.is_edited,
    };
    return response;
};

interface ReactionDataProps {
    name: string;
    reaction: Reaction;
}

export const getReactionData = (reactions: ReactionDataProps[]) => {
    const names = reactions.map((obj) => obj.name);
    let extended = "";
    switch (reactions.length) {
        case 0:
            break;
        case 1:
            extended = names[0];
            break;
        case 2:
            extended = `${names[0]} and ${names[1]}`;
            break;
        case 3:
            extended = `${names[0]}, ${names[1]}, and ${names[2]}`;
            break;
        default:
            if (names.length > 11) {
                extended = names.length.toString();
            } else {
                extended = `${names[0]}, ${names[1]}, and ${names.length - 2} others`;
            }
    }
    const display: ReactionDisplay = {
        standard: reactions.length,
        extended,
    };

    const getData = (reaction: Reaction) => {
        const filtered = reactions.filter((obj) => obj.reaction === reaction);
        const list = getTooltipList(filtered.map((obj) => obj.name));
        return { type: reaction, list, count: filtered.length };
    };

    const summaryBase: { type: Reaction; list: string[]; count: number }[] = [];
    reactionEnum.forEach((str) => {
        const data = getData(str);
        if (data.count) summaryBase.push(data);
    });
    summaryBase.sort((a, b) => b.count - a.count);
    const summaries = summaryBase.map((obj) => {
        const { list, type } = obj;
        return { list, type };
    });

    return { display, summaries };
};
