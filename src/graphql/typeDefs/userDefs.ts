import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type UserFriends {
        _id: ID!
        friendship_date: Int!
    }

    type UserMessages {
        _id: ID!
        last_checked: Int!
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
        is_read: Int!
    }

    type UserChatNotification {
        _id: ID!
        message: String!
        timestamp: Int!
    }

    type User {
        _id: ID!
        username: String!
        password: String!
        first_name: String!
        last_name: String
        profile_picture: String!
        is_online: Boolean!
        join_date: Int!
        friends: [UserFriends]!
        messages: [UserMessages]!
        groups: [ID]!
        posts: [ID]!
        tags: [ID]!
        events: [ID]!
        notifications: [UserNotification]!
        chat_notifs: [UserChatNotification]!
    }

    # Queries

    type Message {
        message: String!
    }

    type Query {
        test: Message
    }
`;
