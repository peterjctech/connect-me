import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
    query ($id: ID!) {
        getGroups(id: $id) {
            group_id
            name
            description
            group_image
            my_status
            is_joined
            join_restriction
            user_count
            friends_in_group_count
        }
    }
`;
