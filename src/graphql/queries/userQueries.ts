import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            user_id
            full_name
            profile_picture
            friend_count
            joined_at
            intro
            theme
            birthday
            age
            color
        }
    }
`;
export const GET_USER_SETTINGS = gql`
    query {
        getUserSettings {
            username
            first_name
            last_name
            intro
            theme
            color
            default_post_is_public
            friend_privacy
            group_privacy
            event_privacy
        }
    }
`;
