import { gql } from "apollo-server-micro";

export default gql`
    # Model
    enum GroupVisibility {
        Private
        Invite
        Public
    }

    type GroupMember {
        _id: ID!
        is_admin: Boolean!
        join_date: Int!
    }

    type Group {
        _id: ID!
        name: String!
        founder: ID!
        description: String
        group_image: String!
        visibility: GroupVisibility!
        members: [GroupMember]!
        tags: [ID]!
        events: [ID]!
        posts: [ID]!
        created_at: Int!
    }
`;
