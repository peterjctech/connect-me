import { gql } from "@apollo/client";

export const GET_ME = gql`
    query {
        getMe {
            _id
            username
            first_name
            last_name
            full_name
            friend_count
        }
    }
`;
