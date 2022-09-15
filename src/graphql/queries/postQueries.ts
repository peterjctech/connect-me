import { gql } from "apollo-server-micro";

export const GET_POSTS = gql`
    query ($id: String!, $type: PostType!) {
        getPosts(id: $id, type: $type) {
            post_id
            author {
                id
                name
            }
            group {
                id
                name
            }
            profile_picture
            is_mine
            content
            picture
            reactions {
                type
                list
            }
            reaction_display {
                standard
                extended
            }
            recent_comments {
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
                    relative
                    absolute
                }
                is_edited
            }
            comment_count
            created_at {
                relative
                absolute
            }
            is_edited
            tags {
                tag_id
                name
            }
        }
    }
`;
