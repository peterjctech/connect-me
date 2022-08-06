import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type EventAttending {
        _id: ID!
        is_confirmed: Boolean!
    }

    type Event {
        _id: ID!
        event: String!
        creator: ID!
        group: ID!
        description: String!
        attending: [EventAttending]!
        comments: [ID]!
        starts_at: Int!
        ends_at: Int!
        created_at: Int!
    }
`;
