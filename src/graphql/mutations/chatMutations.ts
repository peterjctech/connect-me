import { gql } from "@apollo/client";

export const SEND_CHAT_MESSAGE = gql`
    mutation ($chatId: String!, $content: String!) {
        sendChatMessage(chatId: $chatId, content: $content) {
            user_id
            full_name
            profile_picture
            sent_at
            message
            is_mine
        }
    }
`;
