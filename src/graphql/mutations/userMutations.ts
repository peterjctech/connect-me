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

export const UPDATE_USER_SETTINGS = gql`
    mutation (
        $first_name: String
        $last_name: String
        $username: String
        $new_password: String
        $confirm_new_password: String
        $old_password: String
        $theme: String
        $color: String
        $friend_visibility: String
        $group_visibility: String
        $post_visibility: String
        $event_visibility: String
    ) {
        updateUserSettings(
            first_name: $first_name
            last_name: $last_name
            username: $username
            new_password: $new_password
            confirm_new_password: $confirm_new_password
            old_password: $old_password
            theme: $theme
            color: $color
            friend_visibility: $friend_visibility
            group_visibility: $group_visibility
            post_visibility: $post_visibility
            event_visibility: $event_visibility
        ) {
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
