import { gql } from "apollo-server-micro";

export default gql`
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
        interest_visibility: Visibility!
        event_visibility: Visibility!
    }

    type Query {
        initializeStore: UserStoreData
        getMySettings: MySettings
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
    }
`;
