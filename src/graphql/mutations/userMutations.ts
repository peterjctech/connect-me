import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation (
        $username: String
        $password: String
        $confirmPassword: String
        $firstName: String
        $lastName: String
        $birthDate: String
        $birthMonth: String
        $birthYear: String
        $intro: String
    ) {
        registerUser(
            username: $username
            password: $password
            confirmPassword: $confirmPassword
            lastName: $lastName
            firstName: $firstName
            birthDate: $birthDate
            birthMonth: $birthMonth
            birthYear: $birthYear
            intro: $intro
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
        $username: String
        $first_name: String
        $last_name: String
        $profile_picture: String
        $intro: String
        $theme: String
        $color: String
        $default_post_is_public: String
        $friend_privacy: String
        $group_privacy: String
        $event_privacy: String
        $new_password: String
        $confirm_new_password: String
        $old_password: String
    ) {
        updateUserSettings(
            username: $username
            first_name: $first_name
            last_name: $last_name
            profile_picture: $profile_picture
            intro: $intro
            theme: $theme
            color: $color
            default_post_is_public: $default_post_is_public
            friend_privacy: $friend_privacy
            group_privacy: $group_privacy
            event_privacy: $event_privacy
            new_password: $new_password
            confirm_new_password: $confirm_new_password
            old_password: $old_password
        ) {
            message
        }
    }
`;
