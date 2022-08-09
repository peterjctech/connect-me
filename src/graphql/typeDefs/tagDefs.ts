import { gql } from "apollo-server-micro";

export default gql`
    # Model
    type GeneralTag {
        _id: ID!
        title: String!
        color: String!
    }

    type Tag {
        _id: ID!
        title: String!
        color: String!
        user_list: [ID]!
        group_list: [ID]!
    }
`;
