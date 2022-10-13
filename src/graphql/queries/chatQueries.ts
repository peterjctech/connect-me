import { gql } from "@apollo/client";

export const GET_CHATS = gql`
    query {
        getChats {
            chat_id
            title
            last_message {
                profile_picture
                message
                sent_at
            }
        }
    }
`;
export const GET_CHAT_DATA = gql`
    query ($chatId: String!) {
        getChatData(chatId: $chatId) {
            chat_id
            title
            members {
                list
                count
            }
            messages {
                user_id
                full_name
                profile_picture
                sent_at
                message
                is_mine
            }
            read_users
            next_skip_timestamp
        }
    }
`;
export const GET_MORE_CHAT_MESSAGES = gql`
    query ($chatId: String!, $skipTimestamp: Int!) {
        getMoreChatMessages(chatId: $chatId, skipTimestamp: $skipTimestamp) {
            messages {
                user_id
                full_name
                profile_picture
                sent_at
                message
                is_mine
            }
            next_skip_timestamp
        }
    }
`;
