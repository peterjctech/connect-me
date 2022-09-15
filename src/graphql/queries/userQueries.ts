import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            user_id
            full_name
            profile_picture
            join_date
            friend_count
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

export const GET_USER_DATA = gql`
    query ($userId: ID!) {
        getUserData(userId: $userId) {
            user_id
            full_name
            profile_picture
            join_date
            mutual_friends {
                list
                count
            }
            friendship_date
        }
    }
`;

export const GET_FRIENDS = gql`
    query ($userId: ID!) {
        getFriends(userId: $userId) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_date
        }
    }
`;
