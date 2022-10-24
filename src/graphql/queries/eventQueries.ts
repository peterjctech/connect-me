import { gql } from "@apollo/client";

export const GET_EVENT = gql`
    query ($eventId: String!) {
        getEvent(eventId: $eventId) {
            event_id
            name
            description
            dtaetime
            user {
                user_id
                full_name
                profile_picture
            }
            group {
                id
                name
                group_image
            }
            my_status
            tags {
                tag_id
                name
            }
            created_at {
                relative
                absolute
            }
            reactions {
                type
                list
            }
            reaction_display {
                standard
                extended
            }
            my_reaction
            comments {
                comment_id
                user_id
                full_name
                profile_picture
                content
                likes {
                    list
                    count
                }
                created_at {
                    relative
                    absolute
                }
                is_liked
                is_edited
                is_mine
            }
        }
    }
`;
export const GET_EVENT_REACTIONS = gql`
    query ($eventId: String!) {
        getEventReactions(eventId: $eventId) {
            type
            count
            users {
                user_id
                full_name
                profile_picture
                mutual_friend_count
                friendship_status
            }
        }
    }
`;
export const GET_EVENT_COMMENT_LIKES = gql`
    query ($eventId: String!, $commentId: String!) {
        getEventCommentLikes(eventId: $eventId, commentId: $commentId) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_status
        }
    }
`;
export const GET_EVENT_USERS = gql`
    query ($eventId: String!) {
        getEventUsers(eventId: $eventId) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_status
        }
    }
`;
export const GET_EVENT_SETTINGS = gql`
    query ($eventId: String!) {
        getEventSettings(eventId: $eventId) {
            starts_at
            ends_at
            restriction
        }
    }
`;
export const EXPLORE_EVENTS = gql`
    query ($skipNumber: Int!) {
        exploreEvents(skipNumber: $skipNumber) {
            event_id
            name
            user_id
            group_id
            picture
            reference_name
            confirmed_count {
                total
                friends
            }
            datetime
            my_status
        }
    }
`;
