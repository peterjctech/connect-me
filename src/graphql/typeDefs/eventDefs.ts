import { gql } from "apollo-server-micro";

export default gql`
    # Responses
    type PostData {
        post_id: String!
    }
`;
