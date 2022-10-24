import { gql } from "@apollo/client";

export const LIKE_POST_COMMENT = gql`
    mutation ($postId: String!, $commentId: String!) {
        likePostComment(postId: $postId, commentId: $commentId) {
            message
        }
    }
`;
export const UNLIKE_POST_COMMENT = gql`
    mutation ($postId: String!, $commentId: String!) {
        unlikePostComment(postId: $postId, commentId: $commentId) {
            message
        }
    }
`;
export const DELETE_POST_COMMENT = gql`
    mutation ($postId: String!, $commentId: String!) {
        deletePostComment(postId: $postId, commentId: $commentId) {
            message
        }
    }
`;

export const COMMENT_ON_POST = gql`
    mutation ($postId: String!, $content: String!) {
        commentOnPost(postId: $postId, content: $content) {
            comment_id
            user_id
            full_name
            profile_picture
            content
            likes {
                list
                count
            }
            created_at {
                absolute
                relative
            }
            is_liked
            is_edited
            is_mine
        }
    }
`;
