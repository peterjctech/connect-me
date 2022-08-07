import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type Friends {
        _id: ID!
        full_name: String!
        profile_picture: String!
        friendship_date: String!
    }

    type Messages {
        _id: ID!
        title: String!
        last_checked: String!
    }

    type Groups {
        _id: ID!
        name: String!
        description: String!
        group_image: String!
    }

    type Posts {
        _id: ID!
        author: String!
        content: String!
        ref_id: String!
        ref_model: String!
        reaction_count: Int!
        comment_count: Int!
        created_at: String!
        updated_at: String
    }

    type Tags {
        _id: ID!
        title: String!
        color: String!
    }

    type Events {
        _id: ID!
        event: String!
        group: String!
        description: String!
        starts_at: String!
        ends_at: String
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

    type Notifications {
        title: String!
        message: String!
        ref_id: ID!
        ref_model: UserNotificationRef!
        timestamp: Int!
        is_read: Boolean!
    }

    type ChatNotif {
        _id: ID!
        message: String!
        timestamp: Int!
    }

    # Queries

    type GetMeReturn {
        _id: ID!
        full_name: String!
        profile_picture: String!
        join_date: String!
        friends: [Friends]!
        messages: [Messages]!
        groups: [Groups]!
        posts: [Posts]!
        tags: [Tags]!
        events: [Events]!
        notifications: [Notifications]!
        chat_notifs: [ChatNotif]!
        friend_count: Int!
    }

    type Message {
        message: String!
    }

    type Query {
        getMe: GetMeReturn
    }

    # Mutations

    type Mutation {
        createUser(
            firstName: String!
            lastName: String
            username: String!
            password: String!
            confirmPassword: String!
        ): Message
        loginUser(username: String!, password: String!): Message
        logoutUser: Message
    }
`;
