import { gql } from "apollo-server-micro";

export default gql`
    enum MainThemes {
        Light
        Void
        Dark
    }

    enum ColorThemes {
        Blue
        Green
        Purple
        Red
    }

    type UserStoreData {
        user_id: ID!
        full_name: String!
        profile_picture: String!
        theme: MainThemes!
        color: ColorThemes!
    }

    type Query {
        initializeStore: UserStoreData
    }
`;
