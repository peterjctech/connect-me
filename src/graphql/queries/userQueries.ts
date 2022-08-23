import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            id
            full_name
            profile_picture
            theme
        }
    }
`;

export const GET_BASE_PROFILE_DATA = gql`
    query {
        getBaseProfileData {
            join_date
            friend_count
            friends_preview {
                user_id
                full_name
                profile_picture
            }
            group_count
            event_count
            interest_count
        }
    }
`;
