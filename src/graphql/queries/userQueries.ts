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

export const GET_USER_DATA = gql`
    query ($id: ID) {
        getUserData(id: $id) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_date
            join_date
            friend_count
        }
    }
`;

export const GET_USER_FRIENDS = gql`
    query ($id: ID) {
        getUserFriends(id: $id) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_date
        }
    }
`;

export const TEST = gql`
    query {
        test {
            message
        }
    }
`;
