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
                timestamp
            }
            messages {
                _id
                title
                last_checked
                timestamp
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
                group_id
                description
                starts_at
                ends_at
                timestamp
            }
            notifications {
                title
                message
                ref_id
                ref_model
                timestamp
                is_read
                datetime
            }
            chat_notifs {
                _id
                message
                timestamp
                datetime
            }
            friend_count
            is_initialized
        }
    }
`;

export const GET_USER = gql`
    query ($id: String!) {
        getUser(id: $id) {
            _id
            full_name
            profile_picture
            join_date
            friends {
                _id
                full_name
                profile_picture
                friendship_date
                timestamp
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
            friend_count
        }
    }
`;

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            users {
                _id
                full_name
                profile_picture
            }
        }
    }
`;
