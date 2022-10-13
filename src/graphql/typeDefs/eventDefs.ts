import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum EventRestriction {
        Open
        Restricted
        Private
    }
    enum EventMemberStatus {
        Yes
        Maybe
        No
        Invited
    }
    type EventGroup {
        id: String!
        name: String!
        group_image: String!
    }

    # Responses
    type EventSummary {
        event_id: String!
        name: String!
        user_id: String
        group_id: String
        picture: String!
        reference_name: String!
        confirmed_count: TotalAndFriendsCount!
        datetime: String!
        my_status: EventMemberStatus
    }
    type EventData {
        event_id: String!
        name: String!
        description: String!
        datetime: String!
        user: BriefUserSummary
        group: EventGroup
        my_status: EventMemberStatus
        tags: [BriefTagSummary]!
        created_at: CreatedAt!
        reactions: [ReactionSummary]!
        reaction_display: ReactionDisplay!
        my_reaction: Reaction
        comments: [CommentData]!
    }
    type EventUsers {
        yes: [UserSummary]!
        maybe: [UserSummary]!
        no: [UserSummary]!
        invited: [UserSummary]!
    }
    type EventSettings {
        starts_at: Int!
        ends_at: Int
        restriction: EventRestriction!
    }

    # Main
    type Query {
        getEvent(eventId: String!): EventData
        getEventReactions(eventId: String!): [ReactionData]
        getEventCommentLikes(eventId: String!, commentId: String!): [UserSummary]
        getEventUsers(eventId: String!): [UserSummary]
        getEventSettings(eventId: String!): EventSettings
        exploreEvents(skipNumber: Int!): [EventSummary]
    }
`;
