import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    enum Color {
        red
        orange
        yellow
        green
        cyan
        blue
        purple
        magenta
        pink
        white
    }

    # Responses
    type BriefTagSummary {
        tag_id: String!
        name: String!
    }
    type TagSummary {
        tag_id: String!
        name: String!
        color: Color!
        is_added: Boolean!
    }

    # Main
    type Query {
        getTagPosts(tagId: String!, skipTimestamp: Int!): GetPostsResponse
    }
`;
