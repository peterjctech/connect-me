import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum ColorTheme {
        Light
        Dark
    }

    type FriendPreview {
        user_id: ID!
        profile_picture: String!
        full_name: String!
    }

    # Data
    type UserStoreData {
        id: ID!
        full_name: String!
        profile_picture: String!
        theme: ColorTheme!
    }

    type BaseProfileData {
        join_date: String!
        friend_count: Int!
        friends_preview: [FriendPreview]!
        group_count: Int!
        event_count: Int!
        interest_count: Int!
    }

    # Queries
    type Query {
        initializeStore: UserStoreData
        getBaseProfileData: BaseProfileData!
    }
    # Mutations
    type Mutation {
        loginUser(username: String, password: String): Message!
        logoutUser: Message!
    }
`;
