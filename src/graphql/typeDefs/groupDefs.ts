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
        restriction: GroupRestriction!
        member_count: TotalAndFriendsCount!
        my_status: GroupMemberOrUserStatus
    }

    # Main
    type Query {
        getGroupPosts(groupId: String!, skipTimestamp: Int!): GetPostsResponse
    }
`;
