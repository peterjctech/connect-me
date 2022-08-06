import { gql } from "apollo-server-micro";

export default gql`
    # Model
    enum PostReference {
        User
        Group
    }

    enum PostReactions {
        Like
        Love
        Angry
        Sad
        Haha
        Wow
    }

    type PostReaction {
        _id: String!
        reaction: PostReactions!
    }

    type Post {
        _id: ID!
        author: String!
        content: String!
        ref_id: ID!
        ref_model: PostReference!
        reactions: [PostReaction]!
        comments: [ID]!
        created_at: Int!
        updated_at: Int!
    }
`;
