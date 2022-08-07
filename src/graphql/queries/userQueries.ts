import { gql } from "@apollo/client";

export const GET_ME = gql`
    query {
        getMe {
            _id
            full_name
            profile_picture
            join_date
            friends {
                _id
                full_name
                profile_picture
                friendship_date
            }
            messages {
                _id
                title
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
            groups {
                _id
                name
                description
                group_image
            }
            posts {
                _id
                author
                content
                ref_id
                ref_model
                reaction_count
                comment_count
                created_at
                updated_at
            }
            tags {
                _id
                title
                color
            }
            events {
                _id
                event
                group
                description
                starts_at
                ends_at
            }
            notifications {
                title
                message
                ref_id
                ref_model
                timestamp
                is_read
            }
            chat_notifs {
                _id
                message
                timestamp
            }
            friend_count
        }
    }
`;
