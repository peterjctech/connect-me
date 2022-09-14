import { PopulatedPostModel, PostData } from "@types";
import { getCreatedAt, getFullName } from "@utils";
import { getCommentData, getReactionData } from "@services";

export const getPostData = (post: PopulatedPostModel, myId: string) => {
    const allReactions = post.reactions.map((obj) => {
        return { name: getFullName(obj.user), reaction: obj.reaction };
    });
    const { summaries, display } = getReactionData(allReactions);

    const recent_comments = [];
    post.comments.sort((a, b) => b.created_timestamp - a.created_timestamp);
    for (let i = 0; i < 3; i++) {
        if (post.comments[i]) recent_comments.unshift(getCommentData(post.comments[i]));
    }

    const response: PostData = {
        post_id: post._id.toString(),
        author: { id: post.author._id.toString(), name: getFullName(post.author) },
        group: post.group ? { id: post.group._id.toString(), name: post.group.name } : undefined,
        profile_picture: post.author.profile_picture,
        is_mine: myId === post.author._id.toString() ? true : false,
        content: post.content,
        picture: post.picture || undefined,
        comment_count: post.comments.length,
        created_at: getCreatedAt(post.created_timestamp),
        is_edited: post.is_edited,
        reactions: summaries,
        reaction_display: display,
        recent_comments,
        tags: post.tags.map((obj) => {
            return { tag_id: obj._id.toString(), name: obj.name };
        }),
    };
    return response;
};
