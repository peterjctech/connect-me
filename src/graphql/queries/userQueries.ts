import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            _id
            username
            first_name
            last_name
            profile_picture
        }
    }
`;

export const GET_USER = gql`
    query {
        getUser {
            _id
            username
            first_name
            last_name
            profile_picture
            is_online
            join_date
            friends {
                _id
                friendship_date
            }
            groups
            posts
            tags
        }
    }
`;
