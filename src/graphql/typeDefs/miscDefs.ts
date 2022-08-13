import { gql } from "apollo-server-micro";

export default gql`
    # Enums
    enum Reaction {
        Like
        Love
        Sad
        Wow
        Angry
    }

    # Helpers
    type ReactionData {
        user_id: ID!
        full_name: String!
        reaction: Reaction!
        is_friend: Boolean!
    }

    type CommentAuthor {
        id: ID!
        full_name: String!
        profile_picture: String!
    }

    type Comment {
        author: CommentAuthor!
        content: String!
        like_count: Int!
        time_summary: String!
        created_at: String!
        is_edited: Boolean!
    }

    # Misc
    type Message {
        message: String!
    }
`;
