import { gql } from "@apollo/client";

export const ADD_TAG = gql`
    mutation ($tagId: String!) {
        addTag(tagId: $tagId) {
            message
        }
    }
`;
