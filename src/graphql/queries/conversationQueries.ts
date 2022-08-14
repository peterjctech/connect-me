import { gql } from "@apollo/client";

export const GET_ALL_CONVERSATIONS = gql`
    query {
        conversations {
            id
            title
            most_recent_message {
                profile_picture
                full_name
                content
                datetime
            }
            is_read
        }
    }
`;

export const GET_CONVERSATION_DATA = gql`
    query ($convoId: ID!) {
        getConversationData(convoId: $convoId) {
            id
            title
            messages {
                author_id
                author_name
                profile_picture
                content
                datetime
                timestamp
            }
            members {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
            is_read
            read_timestamp
        }
    }
`;
