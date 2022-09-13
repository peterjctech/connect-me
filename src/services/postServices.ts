import {
    PopulatedCommentModel,
    ReactionModel,
    Reaction,
    TagModel,
    UserModel,
    PostData,
    CommentModel,
    ReactionSummary,
    ReactionDisplay,
    CommentData,
    CreatedAt,
    TagSummary,
    GroupModel,
} from "@types";
import { getCommentData } from "@services";
import { formatTimestamp, getFullName, getTooltipList, getUserListDisplay } from "@utils";
import { Types } from "mongoose";

interface PostBase {
    _id: Types.ObjectId;
    author: UserModel;
    content: string;
    picture?: string;
    tags: TagModel[];
    reactions: ReactionModel[];
    comments: PopulatedCommentModel[];
    created_timestamp: number;
    is_edited: boolean;
}

export const getPostData = (post: PostBase, myId: string) => {
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
        getReactionData("Haha"),
    ].sort((a, b) => b.count - a.count);

    let recent_comments = [];
    post.comments.sort((a, b) => b.created_timestamp - a.created_timestamp);
    for (let i = 0; i < 3; i++) {
        if (post.comments[i]) recent_comments.unshift(getCommentData(post.comments[i]));
    }

    const { display, tooltip, count } = getUserListDisplay(post.reactions.map((obj) => getFullName(obj.user)));

    const response: PostData = {
        post_id: post._id.toString(),
        author_id: post.author._id.toString(),
        author: getFullName(post.author),
        profile_picture: post.author.profile_picture,
        is_mine: post.author._id.toString() === myId ? true : false,
        content: post.content,
        picture: post.picture || undefined,
        reactions: reactions
            .filter((obj) => obj.list.length > 0)
            .map((obj) => {
                return { type: obj.type, list: obj.list };
            }),
        reaction_display: {
            extended: display,
            standard: count,
        },
        full_reaction_list: tooltip,
        recent_comments,
        comment_count: post.comments.length,
        created_at: {
            absolute: formatTimestamp(post.created_timestamp, "absolute"),
            relative: formatTimestamp(post.created_timestamp, "relative"),
        },
        is_edited: post.is_edited,
        tags: [],
    };
    return response;
};
