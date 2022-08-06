import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type ChatMessage {
        _id: ID!
        content: String!
        timestamp: Int!
    }

    type Chat {
        _id: ID!
        title: String!
        members: [ID]!
        messages: [ChatMessage]!
    }
`;
