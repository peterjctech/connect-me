import { gql } from "@apollo/client";

export const GET_EVENT_DATA = gql`
    query ($eventId: ID!) {
        getEventData(eventId: $eventId) {
            id
            event
            my_status
            creator_id
            creator_name
            group_id
            group_name
            description
            confirmed_count
            maybe_count
            reaction_list
            reaction_summary
            comment_count
            starts_at
            ends_at
            members {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
                status
            }
            no_count
            unresponsive_count
            reactions {
                user_id
                full_name
                reaction
                is_friend
            }
            comments {
                author
                content
                like_count
                time_summary
                created_at
                is_edited
            }
            join_date
        }
    }
`;
