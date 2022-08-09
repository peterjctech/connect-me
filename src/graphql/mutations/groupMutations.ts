import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
    mutation (
        $name: String
        $founder: String
        $description: String
        $groupImage: String
        $visibility: String
        $tags: [String]
    ) {
        createGroup(
            name: $name
            founder: $founder
            description: $description
            groupImage: $groupImage
            visibility: $visibility
            tags: $tags
        ) {
            message
        }
    }
`;

export const DELETE_GROUP = gql`
    mutation ($id: String!) {
        deleteGroup(id: $id) {
            message
        }
    }
`;
