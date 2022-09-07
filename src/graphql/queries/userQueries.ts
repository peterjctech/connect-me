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
            interest_visibility
            post_visibility
        }
    }
`;
