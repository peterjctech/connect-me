import { gql } from "apollo-server-micro";

export default gql`
    # Model
    enum GroupVisibility {
        Private
        Invite
        Public
    }

    type GroupMemberModelForm {
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
        members: [GroupMemberModelForm]!
        tags: [ID]!
        events: [ID]!
        posts: [ID]!
        created_at: Int!
    }

    # Queries

    type SingleGroup {
        _id: ID!
        name: String!
        description: String!
        group_image: String!
        visibility: String!
    }

    type GetAllGroupsResponse {
        groups: [SingleGroup]!
    }

    type GroupMember {
        _id: ID!
        profile_picture: String!
        full_name: String!
    }

    type GetGroupResponse {
        _id: ID!
        name: String!
        founder_id: ID!
        founder: String!
        description: String!
        group_image: String!
        visibility: String!
        admins: [GroupMember]!
        members: [GroupMember]!
        tags: [GeneralTag]!
        events: [GeneralEvent]!
        posts: [ParsedPost]!
        created_at: String!
    }

    type Query {
        getGroup(id: String!): GetGroupResponse!
        getAllGroups: GetAllGroupsResponse!
    }

    # Mutations

    type Mutation {
        createGroup(
            name: String
            founder: String
            description: String
            groupImage: String
            visibility: String
            tags: [String]
        ): MessageAndId!
        deleteGroup(id: String!): Message!
    }
`;
