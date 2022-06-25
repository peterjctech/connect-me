export interface PostModel {
    post_id: string;
    post: string;
    reactions: {
        user_id: string;
        reaction: string;
    }[];
    comments: {
        user_id: string;
        comment: string;
        created_at: number;
        updated_at?: number;
    }[];
    tags: string[];
    created_at: number;
    updated_at?: number;
}
