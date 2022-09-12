import { PostBase, PostSummary, Reaction } from "@types";
import { getCommentData } from "@services";
import { formatTimestamp, getFullName, getTooltipList, getUserListDisplay } from "@utils";
import { Types } from "mongoose";

export const getPostSummary = (post: PostBase, myId: string) => {
    const getReactionData = (reaction: Reaction) => {
        const reactions = post.reactions.filter((obj) => obj.reaction === reaction);
        const list = getTooltipList(reactions.map((obj) => getFullName(obj.user)));

        return {
            type: reaction,
            list,
            count: reactions.length,
        };
    };

    const reactions = [
        getReactionData("Like"),
        getReactionData("Love"),
        getReactionData("Wow"),
        getReactionData("Sad"),
        getReactionData("Angry"),
    ].sort((a, b) => b.count - a.count);

    let recent_comments = [];
    post.comments.sort((a, b) => b.created_timestamp - a.created_timestamp);
    for (let i = 0; i < 3; i++) {
        if (post.comments[i]) recent_comments.unshift(getCommentData(post.comments[i]));
    }

    const { display, tooltip, count } = getUserListDisplay(post.reactions.map((obj) => getFullName(obj.user)));

    const response: PostSummary = {
        post_id: post._id,
        author_id: post.author._id,
        author: getFullName(post.author),
        profile_picture: post.author.profile_picture || "/profile-picture.jpg",
        is_mine: post.author._id.toString() === myId ? true : false,
        content: post.content,
        picture: post.picture || undefined,
        reactions: reactions
            .filter((obj) => obj.list.length > 0)
            .map((obj) => {
                return { type: obj.type, list: obj.list };
            }),
        reaction_display: display,
        full_reaction_list: tooltip,
        reaction_count: count,
        recent_comments,
        comment_count: post.comments.length,
        created_at: {
            absolute: formatTimestamp(post.created_timestamp, "absolute"),
            relative: formatTimestamp(post.created_timestamp, "relative"),
        },
    };
    return response;
};
