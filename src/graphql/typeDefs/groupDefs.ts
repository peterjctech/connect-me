import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum JoinRestriction {
        Private
        Invite
        Open
        Friends
    }

    enum GroupStatus {
        Admin
        Member
        Pending
    }

    enum MyGroupStatus {
        Admin
        Member
        Pending
        None
    }

    type GroupUpdateHistory {
        update: String!
        updated_at: String!
    }

    type GroupAdminUpdateHistory {
        updated_by: UserSummary!
        update: String!
        updated_at: String!
    }

    # Data
    type GroupSummary {
        id: ID!
        group: String!
        description: String!
        group_image: String!
        my_status: MyGroupStatus!
        is_joined: Boolean!
        join_restriction: JoinRestriction!
        total_member_count: Int!
        friends_in_group: [UserSummary]!
        friends_in_group_count: Int!
    }

    type GroupData {
        id: ID!
        group: String!
        description: String!
        group_image: String!
        my_status: MyGroupStatus!
        is_joined: Boolean!
        join_restriction: JoinRestriction!
        total_member_count: Int!
        friends_in_group: [UserSummary]!
        friends_in_group_count: Int!
        founder_id: ID!
        founder_name: String!
        admins: [UserSummary]!
        admin_count: Int!
        members: [UserSummary]!
        member_count: Int!
        interests: [InterestSummary]!
        events: [EventSummary]!
        posts: [PostSummary]!
        join_date: String!
        created_at: String!
        update_history: [GroupUpdateHistory]!
    }

    type AdminGroupData {
        id: ID!
        group: String!
        description: String!
        group_image: String!
        my_status: MyGroupStatus!
        is_joined: Boolean!
        join_restriction: JoinRestriction!
        total_member_count: Int!
        friends_in_group: [UserSummary]!
        friends_in_group_count: Int!
        founder_id: ID!
        founder_name: String!
        admins: [UserSummary]!
        admin_count: Int!
        members: [UserSummary]!
        member_count: Int!
        interests: [InterestSummary]!
        events: [EventSummary]!
        posts: [PostSummary]!
        join_date: String!
        created_at: String!
        update_history: [GroupAdminUpdateHistory]!
        join_requests: [UserSummary]!
        banned_users: [UserSummary]!
    }

    # Queries
    type Query {
        getGroupData(groupId: ID!): GroupData
    }

    # Mutations
`;
