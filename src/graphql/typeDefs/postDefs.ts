import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    type PostCreatedAt {
        approximate: String!
        exact: String!
    }

    # Data
    type PostSummary {
        id: ID!
        author: UserSummary!
        is_mine: Boolean!
        content: String
        picture: String
        reaction_list: [Reaction]!
        reaction_summary: String!
        comment_count: Int!
        created_at: PostCreatedAt!
        is_edited: Boolean!
    }

    type PostData {
        id: ID!
        author: UserSummary!
        is_mine: Boolean!
        content: String
        picture: String
        reaction_list: [Reaction]!
        reaction_summary: String!
        comment_count: Int!
        created_at: PostCreatedAt!
        is_edited: Boolean!
        reactions: [ReactionData]!
        comments: [Comment]!
        group_id: ID
        group: String
    }

    # Queries
    type Query {
        getPostData(postId: ID!): PostData
    }

    # Mutations
`;
