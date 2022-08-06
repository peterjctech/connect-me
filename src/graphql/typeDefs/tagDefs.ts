import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type Tag {
        _id: ID!
        title: String!
        color: String!
        user_list: [ID]!
        group_list: [ID]!
    }
`;
