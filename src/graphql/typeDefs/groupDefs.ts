import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum GroupMemberOrUserStatus {
        Admin
        Member
        RequestedInvite
        Invited
        Banned
    }
    enum GroupRestriction {
        Open
        Friends
        Invite
        Private
    }

    # Responses
    type GroupSummary {
        group_id: String!
        name: String!
        group_image: String!
        member_count: TotalAndFriendsCount!
        restriction: GroupRestriction!
        my_status: GroupMemberOrUserStatus
    }
    type GroupLayoutData {
        group_id: String!
        owner: BriefUserSummary!
        name: String!
        description: String!
        group_image: String!
        member_count: TotalAndFriendsCount!
        created_at: CreatedAt!
        restriction: GroupRestriction!
        is_authorized: Boolean!
        is_admin: Boolean!
        is_member: Boolean!
    }
    type GroupMembers {
        admins: [BriefUserSummary]!
        members: [BriefUserSummary]!
        invited: [BriefUserSummary]
        requested: [BriefUserSummary]
        banned: [BriefUserSummary]
    }

    # Main
    type Query {
        getGroupLayoutData(groupId: String!): GroupLayoutData
        getGroupPosts(groupId: String!, skipTimestamp: Int!): GetPostsResponse
        getGroupMembers(groupId: String!): GroupMembers
        getGroupEvents(groupId: String!, isMember: Boolean!): [EventSummary]
        getGroupTags(groupId: String!): [TagSummary]
        exploreGroups(skipNumber: Int!): [GroupSummary]
    }
`;
