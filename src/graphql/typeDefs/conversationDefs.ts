import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    type MostRecentMessage {
        profile_picture: String!
        full_name: String!
        content: String!
        datetime: String!
    }

    type ConversationMessage {
        author_id: ID!
        author_name: String!
        profile_picture: String!
        content: String!
        datetime: String!
        timestamp: Int!
    }

    # Data
    type ConversationSummary {
        id: ID!
        title: String!
        most_recent_message: MostRecentMessage
        is_read: Boolean!
    }

    type ConversationData {
        id: ID!
        title: String!
        messages: [ConversationMessage]!
        members: [UserSummary]!
        is_read: Boolean!
        read_timestamp: Int!
    }

    # Queries
    type Query {
        getConversationData(convoId: ID!): ConversationData
        getAllConversations: [ConversationSummary]
    }

    # Mutations
`;
