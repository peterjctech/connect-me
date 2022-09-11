import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    type ReactionSummary {
        type: Reaction!
        list: [String]!
    }

    # Responses
    type PostSummary {
        post_id: ID!
        author_id: ID!
        author: String!
        profile_picture: String!
        is_mine: Boolean!
        content: String!
        picture: String
        reactions: [ReactionSummary]!
        reaction_count: String!
        recent_comments: [CommentData]!
        created_at: CreatedAt!
    }
`;
