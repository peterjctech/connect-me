import { UserModel, PostModel } from "@types";
import { formatTimestamp } from "@utils";

export const getFullName = (user: UserModel) => {
    if (user.last_name) {
        return `${user.first_name} ${user.last_name}`;
    } else {
        return user.first_name;
    }
};

export const parsePost = (obj: PostModel, author: UserModel) => {
    return {
        _id: obj._id,
        author_id: author._id,
        author: getFullName(author),
        content: obj.content,
        ref_id: obj.ref_id,
        ref_model: obj.ref_model,
        reaction_count: obj.reactions.length,
        comment_count: obj.comments.length,
        created_at: formatTimestamp(obj.created_at, "fulldate"),
        updated_at: obj.updated_at ? formatTimestamp(obj.updated_at, "fulldate") : "",
        timestamp: obj.updated_at || obj.created_at,
    };
};
