import { gql } from "apollo-server-micro";

export default gql`
    enum Reaction {
        Like
        Love
        Sad
        Wow
        Angry
        Haha
    }
    type ReactionSummary {
        type: Reaction!
        list: [String!]!
    }
    type ReactionDisplay {
        standard: Int!
        extended: String!
        tooltip: [String!]!
    }
    type IdAndName {
        id: String!
        name: String!
    }
    type CommentData {
        comment_id: String!
        user_id: String!
        full_name: String!
        profile_picture: String!
        content: String!
        likes: ListAndCount!
        created_at: CreatedAt!
        is_edited: Boolean!
    }
    type CreatedAt {
        relative: String!
        absolute: String!
    }
    enum JoinRestriction {
        Private
        Invite
        Open
        Friends
    }
    type ListAndCount {
        list: [String]!
        count: Int!
    }
    type Message {
        message: String!
    }
`;
