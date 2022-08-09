import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type UserFriend {
        _id: ID!
        full_name: String!
        profile_picture: String!
        friendship_date: String!
        timestamp: Int!
    }

    type UserMessage {
        _id: ID!
        title: String!
        last_checked: String!
        timestamp: Int!
    }

    type UserGroup {
        _id: ID!
        name: String!
        description: String!
        group_image: String!
    }

    type UserPost {
        _id: ID!
        author_id: ID!
        author: String!
        content: String!
        ref_id: ID!
        ref_model: PostReference!
        reaction_count: Int!
        comment_count: Int!
        created_at: String!
        updated_at: String!
    }

    type UserTag {
        _id: ID!
        title: String!
        color: String!
    }

    type UserEvent {
        _id: ID!
        event: String!
        group_id: ID!
        group_name: String!
        description: String!
        starts_at: String!
        ends_at: String!
        timestamp: Int!
    }

    enum UserNotificationRef {
        User
        Group
        Post
        Comment
        Chat
        Event
        Tag
    }

    type UserNotification {
        title: String!
        message: String!
        ref_id: ID!
        ref_model: UserNotificationRef!
        timestamp: Int!
        is_read: Boolean!
        datetime: String!
    }

    type UserChatNotif {
        _id: ID!
        message: String!
        timestamp: Int!
        datetime: String!
    }

    # Queries

    type GetMeResponse {
        _id: ID!
        full_name: String!
        profile_picture: String!
        join_date: String!
        friends: [UserFriend]!
        messages: [UserMessage]!
        groups: [UserGroup]!
        posts: [UserPost]!
        tags: [UserTag]!
        events: [UserEvent]!
        notifications: [UserNotification]!
        chat_notifs: [UserChatNotif]!
        friend_count: Int!
        is_initialized: Boolean!
    }

    type GetUserResponse {
        _id: ID!
        full_name: String!
        profile_picture: String!
        join_date: String!
        friends: [UserFriend]!
        groups: [UserGroup]!
        posts: [UserPost]!
        tags: [UserTag]!
        friend_count: Int!
    }

    type SingleUser {
        _id: ID!
        full_name: String!
        profile_picture: String!
    }

    type GetAllUsersResponse {
        users: [SingleUser]!
    }

    type Query {
        getMe: GetMeResponse!
        getUser(id: String!): GetUserResponse!
        getAllUsers: GetAllUsersResponse!
    }

    # Mutations

    type Mutation {
        createUser(
            firstName: String
            lastName: String
            username: String
            password: String
            confirmPassword: String
        ): Message
        loginUser(username: String, password: String): Message
        logoutUser: Message
        deleteUser(id: String!): Message
    }
`;
