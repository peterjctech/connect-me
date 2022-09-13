import { gql } from "apollo-server-micro";

export default gql`
    # Helpers
    type LastConvoMessage {
        name: String!
        message: String!
        time: String!
        profile_picture: String!
    }

    # Responses
    type ConversationSummary {
        convo_id: String!
        title: String!
        is_read: Boolean!
        last_message: LastConvoMessage
    }
`;
