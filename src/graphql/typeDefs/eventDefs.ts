import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum EventRestriction {
        Open
        Friends
        Members
        Private
    }
    enum EventMemberStatus {
        Yes
        Maybe
        No
        Invited
    }
    type EventUser {
        id: String!
        full_name: String!
        profile_picture: String!
    }
    type EventGroup {
        id: String!
        name: String!
        group_image: String!
    }

    # Responses
    type EventSummary {
        event_id: String!
        user: EventUser
        group: EventGroup
        name: String!
        confirmed_count: TotalAndFriendsCount!
        datetime: String!
        can_edit: Boolean!
        restriction: EventRestriction!
        my_status: EventMemberStatus
    }
`;
