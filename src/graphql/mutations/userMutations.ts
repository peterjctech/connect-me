import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation ($username: String, $password: String) {
        loginUser(username: $username, password: $password) {
            message
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation {
        logoutUser {
            message
        }
    }
`;
