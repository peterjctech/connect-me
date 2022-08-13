import { gql } from "@apollo/client";

export const GET_POST_DATA = gql`
    query ($postId: ID!) {
        getPostData(postId: $postId) {
            id
            author {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
            is_mine
            content
            picture
            reaction_list
            reaction_summary
            comment_count
            created_at
            is_edited
            reactions {
                user_id
                full_name
                reaction
                is_friend
            }
            comments {
                author
                content
                like_count
                time_summary
                created_at
                is_edited
            }
            group_id
            group
        }
    }
`;
