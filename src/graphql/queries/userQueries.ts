import { gql } from "@apollo/client";

export const GET_ME = gql`
    query {
        getMe {
            _id
            username
            first_name
            last_name
            full_name
            profile_picture
            join_date
            friends {
                _id
                friendship_date
            }
            messages {
                _id
                last_checked
            }
            notifications {
                title
                message
                ref_id
                ref_model
                timestamp
                is_read
            }
            groups
            posts
            tags
            events
            chat_notifs {
                _id
                message
                timestamp
            }
            friend_count
        }
    }
`;
