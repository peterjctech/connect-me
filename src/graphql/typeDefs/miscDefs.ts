import { gql } from "apollo-server-micro";

export default gql`
    enum Reaction {
        Like
        Love
        Sad
        Wow
        Angry
    }

    type Message {
        message: String!
    }

    type CreatedAt {
        relative: String!
        absolute: String!
    }

    type CommentData {
        user_id: ID!
        full_name: String!
        profile_picture: String!
        content: String!
        like_count: Int!
        like_list: [String]!
        created_at: CreatedAt!
    }
`;
