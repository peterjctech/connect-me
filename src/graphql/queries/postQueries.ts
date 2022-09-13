import { gql } from "apollo-server-micro";

export const GET_POSTS = gql`
    query ($id: ID, $enum: String) {
        getPosts(id: $id, enum: $enum) {
            post_id
            author_id
            group_id
            profile_picture
            is_mine
            author
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
            full_reaction_list
            recent_comments {
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
            }
            comment_count
            created_at {
                relative
                absolute
            }
            is_edited
            tags {
                id
                name
            }
        }
    }
`;
