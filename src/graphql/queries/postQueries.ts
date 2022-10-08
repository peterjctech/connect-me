import { gql } from "@apollo/client";

export const GET_POST = gql`
    query ($postId: String!) {
        getPost(postId: $postId) {
            post_id
            author {
                id
                full_name
                profile_picture
            }
            group {
                id
                name
            }
            content
            media
            tags {
                tag_id
                name
            }
            reactions {
                type
                list
            }
            my_reaction
            reaction_display {
                standard
                extended
            }
            comments {
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
            }
            created_at {
                absolute
                relative
            }
            is_edited
            is_mine
        }
    }
`;
