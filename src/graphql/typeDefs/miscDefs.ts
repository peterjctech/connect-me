import { gql } from "apollo-server-micro";

export default gql`
    # Enums
    enum ColorTheme {
        Light
        Dark
    }

    # Misc
    type Message {
        message: String!
    }
`;
