import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation ($firstName: String, $lastName: String, $username: String, $password: String, $confirmPassword: String) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            username: $username
            password: $password
            confirmPassword: $confirmPassword
        ) {
            message
        }
    }
`;

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
