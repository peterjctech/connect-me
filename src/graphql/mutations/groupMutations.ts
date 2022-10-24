import { gql } from "@apollo/client";

export const JOIN_GROUP = gql`
    mutation ($groupId: String!) {
        joinGroup(groupId: $groupId) {
            message
        }
    }
`;
