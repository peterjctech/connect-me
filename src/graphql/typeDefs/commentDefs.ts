import { gql } from "apollo-server-micro";

export default gql`
    # Model
    enum CommentReference {
        Post
        Event
    }

    type Comment {
        _id: ID!
        author: ID!
        content: String!
        ref_id: ID!
        ref_model: CommentReference!
        likes: [ID]!
        created_at: Int!
        updated_at: Int
    }
`;
