import { gql } from "@apollo/client";

export const GET_GROUP = gql`
    query ($id: String!) {
        getGroup(id: $id) {
            _id
            name
            founder_id
            founder
            description
            group_image
            visibility
            admins {
                _id
                profile_picture
                full_name
            }
            members {
                _id
                profile_picture
                full_name
            }
            tags {
                _id
                title
                color
            }
            events {
                _id
                event
                creator
                description
                starts_at
                created_at
            }
            posts {
                _id
                author_id
                author
                content
                ref_id
                ref_model
                reaction_count
                comment_count
                created_at
                updated_at
                timestamp
            }
            created_at
        }
    }
`;

export const GET_ALL_GROUPS = gql`
    query {
        getAllGroups {
            groups {
                _id
                name
                description
                group_image
                visibility
            }
        }
    }
`;
