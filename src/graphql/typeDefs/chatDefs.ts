import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    type LastChatMessage {
        profile_picture: String!
        message: String!
        sent_at: String!
    }
    type ChatMessage {
        user_id: String!
        full_name: String!
        profile_picture: String!
        sent_at: String!
        message: String!
        is_mine: Boolean!
    }

    # Responses
    type ChatSummary {
        chat_id: String!
        title: String!
        last_message: LastChatMessage
    }
    type ChatData {
        chat_id: String!
        title: String!
        members: ListAndCount!
        messages: [ChatMessage]
        read_users: String!
        next_skip_timestamp: Int!
    }
    type MoreChatMessages {
        messages: [ChatMessage]!
        next_skip_timestamp: Int!
    }

    # Main
    type Query {
        getChats: [ChatSummary]
        getChatData(chatId: String!): ChatData
        getMoreChatMessages(chatId: String!, skipTimestamp: Int!): MoreChatMessages
    }
    type Mutation {
        sendChatMessage(chatId: String!, content: String!): ChatMessage
    }
`;
