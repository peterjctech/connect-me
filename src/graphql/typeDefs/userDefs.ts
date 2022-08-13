import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum ColorTheme {
        Light
        Dark
    }

    type UserDataGroup {
        mutual: [GroupSummary]!
        mutual_count: Int!
        non_mutual: [GroupSummary]
        total_count: Int
    }

    type UserDataInterest {
        mutual: [InterestSummary]!
        mutual_count: Int!
        non_mutual: [InterestSummary]
    }

    type UserDataEvent {
        mutual: [EventSummary]!
        non_mutual: [EventSummary]
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
        mutual_friends: [UserSummary]!
        mutual_friend_count: Int!
        non_mutual_friends: [UserSummary]
        total_friend_count: Int
        group: [UserDataGroup]!
        posts: [PostSummary]
        interests: [UserDataInterest]!
        events: [UserDataEvent]!
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

    # Queries
    type Query {
        initializeStore: UserStoreData
        getProfileData: ProfileData
        getUserData(userId: ID!): UserData
    }

    # Mutations
    type Mutation {
        loginUser(username: String, password: String): Message!
        logoutUser: Message!
    }
`;
