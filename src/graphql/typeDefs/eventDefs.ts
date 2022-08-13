import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum EventMemberStatus {
        Yes
        Maybe
        No
        Unresponsive
    }

    type EventMember {
        id: ID!
        full_name: String!
        profile_picture: String!
        mutual_friend_count: Int!
        status: EventMemberStatus
    }

    # Data
    type EventSummary {
        id: ID!
        event: String!
        my_status: EventMemberStatus!
        creator_id: ID!
        creator_name: String!
        group_id: ID!
        group_name: String!
        description: String!
        confirmed_count: Int!
        maybe_count: Int!
        reaction_list: [Reaction]!
        reaction_summary: String
        comment_count: Int
        starts_at: String!
        ends_at: String
    }

    type EventData {
        id: ID!
        event: String!
        my_status: EventMemberStatus!
        creator_id: ID!
        creator_name: String!
        group_id: ID!
        group_name: String!
        description: String!
        confirmed_count: Int!
        maybe_count: Int!
        reaction_list: [Reaction]!
        reaction_summary: String
        comment_count: Int
        starts_at: String!
        ends_at: String
        members: [EventMember]!
        no_count: Int!
        unresponsive_count: Int!
        reactions: [ReactionData]!
        comments: [Comment]!
        join_date: String
    }

    # Queries
    type Query {
        getEventData(eventId: ID!): EventData
    }

    # Mutations
`;
