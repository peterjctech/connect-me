export interface ChatModel {
    chat_id: string;
    // User
    members: string[];
    messages: {
        message: string;
        sender_id: string;
        sender_name: string;
        date: string;
        timestamp: string;
    }[];
}
