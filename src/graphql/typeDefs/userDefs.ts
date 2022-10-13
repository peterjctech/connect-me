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
    enum PrivacyOption {
        Everyone
        FriendsOnly
        ShowMutual
        Private
    }
    enum FriendStatus {
        Sent
        Recieved
        Accepted
    }

    # Responses
    type BriefUserSummary {
        user_id: String!
        full_name: String!
        profile_picture: String!
    }
    type UserSummary {
        user_id: String!
        full_name: String!
        profile_picture: String!
        mutual_friend_count: Int
        friendship_status: FriendStatus
    }
    type UserLayoutData {
        user_id: String!
        full_name: String!
        profile_picture: String!
        friend_count: TotalAndMutualCount!
        joined_at: String!
        intro: String!
        birthday: String!
        age: Int!
        friend_privacy: PrivacyOption!
        group_privacy: PrivacyOption!
        event_privacy: PrivacyOption!
        friendship_status: FriendStatus
    }
    type UserStoreData {
        user_id: String!
        full_name: String!
        profile_picture: String!
        friend_count: Int!
        joined_at: String!
        intro: String!
        birthday: String!
        age: Int!
        theme: MainTheme!
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
        friend_privacy: PrivacyOption!
        group_privacy: PrivacyOption!
        event_privacy: PrivacyOption!
    }

    # Main
    type Query {
        initializeStore: UserStoreData
        getUserSettings: UserSettings
        getUserLayoutData(userId: String!): UserLayoutData
        getUserPosts(userId: String!, isFriend: Boolean!, skipTimestamp: Int!): GetPostsResponse
        getUserFriends(userId: String!, isFriend: Boolean!, privacy: PrivacyOption!): [UserSummary]
        getUserGroups(userId: String!, isFriend: Boolean!, privacy: PrivacyOption!): [GroupSummary]
        getUserTags(userId: String!): [TagSummary]
        getUserEvents(userId: String!, isFriend: Boolean!, privacy: PrivacyOption!): [EventSummary]
        exploreUsers(skipNumber: Int!): [UserSummary]
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
