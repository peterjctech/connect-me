import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum EventMemberStatus {
        Yes
        Maybe
        No
    }
    type EventUserCount {
        yes: Int!
        maybe: Int!
        no: Int!
    }

    # Responses
    type EventSummary {
        name: String!
        tags: [TagSummary]!
        group: IdAndName
        join_restriction: JoinRestriction!
        description: String!
        picture: String!
        my_status: EventMemberStatus
        yes_count: Int!
        friends_confirmed: ListAndCount!
    }
    type EventData {
        name: String!
        creator: IdAndName!
        tags: [TagSummary]!
        group: IdAndName
        join_restriction: JoinRestriction!
        description: String!
        picture: String!
        my_status: EventMemberStatus
        reactions: [ReactionSummary]!
        reaction_display: ReactionDisplay!
        users: EventUserCount!
        recent_comments: [CommentData]!
        comment_count: Int!
        created_at: CreatedAt!
        date: String!
    }
`;
