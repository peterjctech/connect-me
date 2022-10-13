import { gql } from "apollo-server-micro";

export default gql`
    enum Reaction {
        Angry
        Like
        Love
        Haha
        Sad
        Wow
    }

    type ReactionDisplay {
        standard: Int!
        extended: String!
    }
    type ReactionSummary {
        type: Reaction!
        list: [String!]!
    }
    type ReactionData {
        type: Reaction!
        count: Int!
        users: [UserSummary!]!
    }
    type CommentData {
        comment_id: String!
        user_id: String!
        full_name: String!
        profile_picture: String!
        content: String!
        likes: ListAndCount!
        created_at: CreatedAt!
        is_liked: Boolean!
        is_edited: Boolean!
    }
    type ListAndCount {
        list: [String]!
        count: Int!
    }
    type CreatedAt {
        absolute: String!
        relative: String!
    }
    type TotalAndFriendsCount {
        total: Int!
        friends: Int!
    }
    type TotalAndMutualCount {
        total: Int
        mutual: Int!
    }
    type Message {
        message: String!
    }
`;
