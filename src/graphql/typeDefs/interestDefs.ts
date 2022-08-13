import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum Color {
        red
        orange
        yellow
        green
        cyan
        blue
        purple
        magenta
        pink
        white
    }

    # Data
    type InterestSummary {
        id: ID!
        interest: String!
        color: Color!
        is_added: Boolean!
    }

    type InterestData {
        id: ID!
        interest: String!
        color: Color!
        is_added: Boolean!
        users: [UserSummary]!
        friend_count: Int!
        total_count: Int!
        groups: [GroupSummary]!
    }

    # Queries
    type Query {
        getInterestData(interestId: ID!): InterestData
    }

    # Mutations
`;
