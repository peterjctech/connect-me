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
    type TagLayoutData {
        tag_id: String!
        name: String!
        color: Color!
        is_added: Boolean!
        user_count: Int!
        friends: ListAndCount!
    }

    # Main
    type Query {
        getTagPosts(tagId: String!, skipTimestamp: Int!): GetPostsResponse
        getTagLayoutData(tagId: String!): TagLayoutData!
        getTagUsers(tagId: String!): [UserSummary]
        getTagGroups(tagId: String!): [GroupSummary]
        getTagEvents(tagId: String!): [EventSummary]
        exploreTags(skipNumber: Int!): [TagSummary]
    }
`;
