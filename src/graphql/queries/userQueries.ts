import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            user_id
            full_name
            profile_picture
            theme
            color
        }
    }
`;

export const GET_MY_SETTINGS = gql`
    query {
        getMySettings {
            username
            first_name
            last_name
            theme
            color
            friend_visibility
            group_visibility
            event_visibility
            post_visibility
        }
    }
`;

export const GET_PROFILE_DATA = gql`
    query ($id: ID) {
        getProfileData(id: $id) {
            join_date
            friend_count
            posts {
                post_id
                author_id
                author
                profile_picture
                is_mine
                content
                picture
                reactions {
                    type
                    list
                }
                reaction_display
                full_reaction_list
                reaction_count
                recent_comments {
                    user_id
                    full_name
                    profile_picture
                    content
                    like_count
                    like_list
                    created_at {
                        relative
                        absolute
                    }
                }
                created_at {
                    relative
                    absolute
                }
            }
        }
    }
`;
