import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum MainThemes {
        Light
        Void
        Dark
    }

    enum ColorThemes {
        Blue
        Green
        Purple
        Red
    }

    enum Visibility {
        Everyone
        Friends
        Nobody
    }

    # Responses
    type UserStoreData {
        user_id: ID!
        full_name: String!
        profile_picture: String!
        theme: MainThemes!
        color: ColorThemes!
    }

    type MySettings {
        username: String!
        first_name: String!
        last_name: String!
        theme: MainThemes!
        color: ColorThemes!
        friend_visibility: Visibility!
        group_visibility: Visibility!
        post_visibility: Visibility!
        event_visibility: Visibility!
    }

    type ProfileData {
        join_date: String!
        friend_count: String!
        posts: [PostSummary]!
    }

    # Main
    type Query {
        initializeStore: UserStoreData
        getMySettings: MySettings
        getProfileData(id: ID): ProfileData
    }

    type Mutation {
        registerUser(
            firstName: String
            lastName: String
            username: String
            password: String
            confirmPassword: String
        ): Message
        loginUser(username: String, password: String): Message
        logoutUser: Message
        updateUserSettings(
            first_name: String
            last_name: String
            username: String
            new_password: String
            confirm_new_password: String
            old_password: String
            theme: String
            color: String
            friend_visibility: String
            group_visibility: String
            post_visibility: String
            event_visibility: String
        ): MySettings
    }
`;
