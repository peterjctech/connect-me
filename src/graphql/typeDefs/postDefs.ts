import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum PostType {
        User
        Group
    }

    # Responses
    type PostData {
        post_id: String!
        author: IdAndName!
        group: IdAndName
        profile_picture: String!
        is_mine: Boolean!
        content: String!
        picture: String
        reactions: [ReactionSummary]!
        reaction_display: ReactionDisplay!
        recent_comments: [CommentData]!
        comment_count: Int!
        created_at: CreatedAt!
        is_edited: Boolean!
        tags: [TagSummary]!
    }

    # Main
    type Query {
        getPosts(id: String!, type: PostType): [PostData]!
    }
`;
