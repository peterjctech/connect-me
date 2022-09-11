import { CommentBase, CommentData } from "@types";
import { formatTimestamp, getFullName, getTooltipList } from "@utils";

export const getCommentData = (comment: CommentBase) => {
    const author = comment.author;

    const response: CommentData = {
        user_id: author._id,
        full_name: getFullName(author),
        profile_picture: author.profile_picture,
        content: comment.content,
        like_count: comment.likes.length,
        like_list: getTooltipList(comment.likes.map((obj) => getFullName(obj))),
        created_at: {
            relative: formatTimestamp(comment.created_timestamp, "relative"),
            absolute: formatTimestamp(comment.created_timestamp, "absolute"),
        },
    };
    return response;
};
