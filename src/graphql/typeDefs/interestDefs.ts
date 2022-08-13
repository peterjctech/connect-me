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

    type InterestDataUsers {
        friends: [UserSummary]!
        non_friends: [UserSummary]!
        friend_count: Int!
        total_count: Int!
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
        users: [InterestDataUsers]!
        groups: [GroupSummary]!
    }

    # Queries
    type Query {
        getInterestData(interestId: ID!): InterestData
    }

    # Mutations
`;
