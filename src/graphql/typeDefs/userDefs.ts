import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum ColorTheme {
        Light
        Dark
    }

    # Data
    type UserStoreData {
        id: ID!
        full_name: String!
        profile_picture: String!
        theme: ColorTheme!
    }

    type UserSummary {
        id: ID!
        full_name: String!
        profile_picture: String!
        mutual_friend_count: Int!
        is_friend: Boolean!
    }

    type FriendSummary {
        id: ID!
        full_name: String!
        profile_picture: String!
        mutual_friend_count: Int!
        friendship_date: String!
    }

    type UserData {
        id: ID!
        full_name: String!
        profile_picture: String!
        join_date: String!
        is_friend: Boolean!
        friends: [UserSummary]!
        mutual_friend_count: Int!
        friend_count: Int
        groups: [GroupSummary]!
        group_count: Int
        posts: [PostSummary]
        mutual_group_count: Int!
        mutual_interest_count: Int!
        interests: [InterestSummary]!
        events: [EventSummary]!
    }

    type ProfileData {
        id: ID!
        full_name: String!
        profile_picture: String!
        join_date: String!
        friends: [FriendSummary]!
        friend_count: Int!
        groups: [GroupSummary]!
        group_count: Int!
        posts: [PostSummary]!
        interests: [InterestSummary]!
        interest_count: Int!
        events: [EventSummary]!
        event_count: Int!
    }

    type AllUsers {
        users: [UserSummary]!
    }

    # Queries
    type Query {
        initializeStore: UserStoreData
        getProfileData: ProfileData
        getUserData(userId: ID!): UserData
        getAllUsers: AllUsers!
    }

    # Mutations
    type Mutation {
        loginUser(username: String, password: String): Message!
        logoutUser: Message!
    }
`;
