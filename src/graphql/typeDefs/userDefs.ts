import { gql } from "apollo-server-micro";
// chat_notifs: {
//     _id: Types.ObjectId;
//     message: string;
//     timestamp: number;
// }[];
export default gql`
    type User {
        _id: ID!
        username: String!
        password: String!
        first_name: String!
        last_name: String!
        profile_picture: String!
        is_online: Boolean!
        join_date: Int!
        friends: [Friend]
        messages: [Message]
        groups: [ID]
        posts: [ID]
        tags: [ID]
        events: [ID]
        notifications: [Notification]
        friend_requests: [FriendRequest]
        chat_notifs: [ChatNotif]
    }

    type Friend {
        _id: ID!
        friendship_date: Int!
    }

    type Message {
        _id: ID!
        last_checked: Int!
    }

    type Notification {
        _id: ID!
        ref: String!
        title: String!
        message: String!
        timestamp: Int!
        is_read: Boolean!
    }

    type FriendRequest {
        _id: ID!
        timestamp: Int!
    }

    type ChatNotif {
        _id: ID!
        message: String!
        timestamp: Int!
    }

    type Query {
        getAllUsers: [User]
    }

    type CreateUserReturn {
        message: String
    }

    type Mutation {
        createUser(
            firstName: String
            lastName: String
            username: String
            password: String
            confirmPassword: String
        ): CreateUserReturn
    }
`;
