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
    enum VisibilityPreference {
        Everyone
        Friends
        Nobody
    }

    # Responses
    type MySettings {
        username: String!
        first_name: String!
        last_name: String!
        theme: MainThemes!
        color: ColorThemes!
        friend_visibility: VisibilityPreference!
        group_visibility: VisibilityPreference!
        post_visibility: VisibilityPreference!
        event_visibility: VisibilityPreference!
    }
    type UserStoreData {
        user_id: String!
        full_name: String!
        profile_picture: String!
        theme: MainThemes!
        color: ColorThemes!
    }
    type UserSummary {
        user_id: String!
        full_name: String!
        profile_picture: String!
        mutual_friend_count: Int
        friendship_date: String
    }
    type UserData {
        user_id: String!
        full_name: String!
        profile_picture: String!
        join_date: String!
        mutual_friend_count: Int
        friendship_date: String
        friend_count: Int
    }

    # Main
    type Query {
        initializeStore: UserStoreData
        getMySettings: MySettings
        getUserData(id: ID): UserData
        getUserFriends(id: ID): [UserSummary]!
        test: Message
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
