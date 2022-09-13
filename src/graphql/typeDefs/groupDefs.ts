import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum GroupStatus {
        Founder
        Admin
        Pending
        Banned
    }

    # Responses
    type GroupSummary {
        group_id: String!
        name: String!
        description: String!
        group_image: String!
        join_restriction: JoinRestriction!
        user_count: Int!
        friends_joined: ListAndCount!
        my_status: GroupStatus
    }
    type GroupData {
        group_id: String!
        name: String!
        description: String!
        group_image: String!
        join_restriction: JoinRestriction!
        user_count: Int!
        friends_joined: ListAndCount!
        posts: [PostData]
        tags: [TagSummary]!
        my_status: GroupStatus
    }
`;
