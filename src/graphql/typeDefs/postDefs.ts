import { gql } from "apollo-server-micro";

export default gql`
    # Responses
    type PostData {
        post_id: String!
        author_id: String!
        group_id: String
        profile_picture: String!
        is_mine: Boolean!
        author: String!
        content: String!
        picture: String
        reactions: [ReactionSummary]!
        reaction_display: ReactionDisplay!
        full_reaction_list: [String]!
        recent_comments: [CommentData]!
        comment_count: Int!
        created_at: CreatedAt!
        is_edited: Boolean!
        tags: [TagSummary]!
    }
`;
