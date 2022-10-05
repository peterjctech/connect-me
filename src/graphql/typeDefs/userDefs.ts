import { gql } from "apollo-server-micro";

export default gql`
    #Helpers
    enum MainTheme {
        Light
        Dark
        Void
    }
    enum ColorTheme {
        Blue
        Purple
        Green
        Red
    }
    type Message {
        message: String!
    }

    # Responses
    type UserStoreData {
        user_id: String!
        full_name: String!
        profile_picture: String!
        friend_count: Int!
        joined_at: String!
        intro: String!
        theme: MainTheme!
        birthday: String!
        age: Int!
        color: ColorTheme!
    }
    type UserSettings {
        username: String!
        first_name: String!
        last_name: String!
        intro: String!
        theme: MainTheme!
        color: ColorTheme!
        default_post_is_public: Boolean!
        friend_privacy: String!
        group_privacy: String!
        event_privacy: String!
    }

    # Main
    type Query {
        initializeStore: UserStoreData
        getUserSettings: UserSettings
    }
    type Mutation {
        updateUserSettings(
            username: String
            first_name: String
            last_name: String
            profile_picture: String
            intro: String
            theme: String
            color: String
            default_post_is_public: String
            friend_privacy: String
            group_privacy: String
            event_privacy: String
            new_password: String
            confirm_new_password: String
            old_password: String
        ): Message
        registerUser(
            username: String
            password: String
            confirmPassword: String
            firstName: String
            lastName: String
            birthDate: String
            birthMonth: String
            birthYear: String
            intro: String
        ): Message
        loginUser(username: String, password: String): Message
        logoutUser: Message
    }
`;
