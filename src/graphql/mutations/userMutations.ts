import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation ($firstName: String, $lastName: String, $username: String, $password: String, $confirmPassword: String) {
        registerUser(
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
