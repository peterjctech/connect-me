import { CommentData, PopulatedCommentModel, UserModel } from "@types";
import { formatTimestamp, getFullName, getTooltipList } from "@utils";

export const getCommentData = (comment: PopulatedCommentModel) => {
    const author = comment.author;

    const response: CommentData = {
        user_id: author._id.toString(),
        full_name: getFullName(author),
        profile_picture: author.profile_picture,
        content: comment.content,
        likes: {
            list: getTooltipList(comment.likes.map((obj) => getFullName(obj))),
            count: comment.likes.length,
        },
        created_at: {
            relative: formatTimestamp(comment.created_timestamp, "relative"),
            absolute: formatTimestamp(comment.created_timestamp, "absolute"),
        },
    };
    return response;
};
