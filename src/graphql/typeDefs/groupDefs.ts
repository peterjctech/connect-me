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
        updated_by: UserSummary
        update: String!
        updated_at: String!
    }

    type GroupMember {
        id: ID!
        full_name: String!
        profile_picture: String!
        mutual_friend_count: Int!
        is_friend: Boolean!
        is_admin: Boolean!
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
        user_count: Int!
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
        user_count: Int!
        friends_in_group_count: Int!
        member_count: Int!
        admin_count: Int!
        founder_id: ID!
        founder_name: String!
        users: [UserSummary]!
        interests: [InterestSummary]!
        events: [EventSummary]!
        posts: [PostSummary]!
        join_date: String!
        created_at: String!
        update_history: [GroupUpdateHistory]!
        join_requests: [UserSummary]
        banned_users: [UserSummary]
    }

    # Queries
    type Query {
        getGroupData(groupId: ID!): GroupData
    }

    # Mutations
`;
