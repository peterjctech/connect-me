import { gql } from "apollo-server-micro";

export default gql`
    type Message {
        message: String!
    }

    type MessageAndId {
        message: String!
        id: ID!
    }
`;
