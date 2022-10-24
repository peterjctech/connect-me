import { gql } from "@apollo/client";

export const LIKE_EVENT_COMMENT = gql`
    mutation ($eventId: String!, $commentId: String!) {
        likeEventComment(eventId: $eventId, commentId: $commentId) {
            message
        }
    }
`;
