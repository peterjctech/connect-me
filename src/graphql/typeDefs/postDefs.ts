import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    type PostAuthor {
        id: String!
        full_name: String!
        profile_picture: String!
    }
    type PostGroup {
        id: String!
        name: String!
    }

    # Responses
    type PostSummary {
        post_id: String!
        author: PostAuthor!
        content: String!
        media: String
        tags: [BriefTagSummary]!
        reactions: [Reaction]!
        my_reaction: Reaction
        reaction_display: ReactionDisplay!
        recent_comments: [CommentData]!
        comment_count: Int!
        created_at: CreatedAt!
        is_edited: Boolean!
        is_mine: Boolean!
    }
    type PostData {
        post_id: String!
        author: PostAuthor!
        group: PostGroup
        content: String!
        media: String
        tags: [BriefTagSummary]!
        reactions: [ReactionSummary]!
        my_reaction: Reaction
        reaction_display: ReactionDisplay!
        comments: [CommentData]!
        created_at: CreatedAt!
        is_edited: Boolean!
        is_mine: Boolean!
    }
    type GetPostsResponse {
        next_skip_timestamp: Int!
        posts: [PostSummary]!
    }

    # Main
    type Query {
        getPost(postId: String!): PostData
    }
`;
