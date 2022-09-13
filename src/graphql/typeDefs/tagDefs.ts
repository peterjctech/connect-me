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
    type TagSummary {
        tag_id: String!
        name: String!
    }
    type TagData {
        tag_id: String!
        name: String!
        color: Color!
        friends: ListAndCount!
        posts: [PostData]!
        user_count: Int!
    }
`;
