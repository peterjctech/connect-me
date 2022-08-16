import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            id
            full_name
            profile_picture
            theme
        }
    }
`;
