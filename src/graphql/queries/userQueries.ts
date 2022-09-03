import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            user_id
            full_name
            profile_picture
            theme
            color
        }
    }
`;
