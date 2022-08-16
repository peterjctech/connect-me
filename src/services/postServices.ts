import { PostSummary, UserModel, Reaction, PopulatedPostModel } from "@types";
import { getUserSummary } from "./userServices";
import { formatTimestamp, getReactionList } from "@utils";

export const getPostSummary = (post: PopulatedPostModel, me: UserModel | null) => {
    const response: PostSummary = {
        id: post._id,
        author: getUserSummary(post.author, me),
        is_mine: me && post.author._id === me._id ? true : false,
        content: post.content || undefined,
        picture: post.picture || undefined,
        reaction_list: getReactionList(post.reactions),
        reaction_count: post.reactions.length,
        comment_count: post.comments.length,
        created_at: {
            approximate: formatTimestamp(post.created_timestamp, "dynamicdate"),
            exact: formatTimestamp(post.created_timestamp, "fulldate"),
        },
        is_edited: post.is_edited,
    };
    return response;
};
