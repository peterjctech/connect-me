export interface ChatModel {
    chat_id: string;
    chat_name: string;
    members: string[];
    messages: {
        user_id: string;
        message: string;
        timestamp: number;
    }[];
}
