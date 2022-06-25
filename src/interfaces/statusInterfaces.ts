export interface StatusModel {
    status_id: string;
    content: string;
    image: string;
    likes: string[];
    loves: string[];
    angries: string[];
    sads: string[];
    wows: string[];
    comments: {
        user_id: string;
        user: string;
        comment: string;
    };
    // Interest
    tags: string[];
}
