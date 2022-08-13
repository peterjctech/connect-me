import { gql } from "apollo-server-micro";

export default gql`
    # Helpers

    # Models
    type UserStoreData {
        id: ID!
        full_name: String!
        profile_picture: String!
        theme: ColorTheme!
    }

    # Queries
    type Query {
        initializeStore: UserStoreData
    }

    # Mutations
    type Mutation {
        loginUser(username: String, password: String): Message!
        logoutUser: Message!
    }
`;
