import { gql } from "@apollo/client";

export const GET_POST = gql`
    query ($postId: String!) {
        getPost(postId: $postId) {
            post_id
            author {
                user_id
                full_name
                profile_picture
            }
            group {
                id
                name
            }
            content
            media
            tags {
                tag_id
                name
            }
            reactions {
                type
                list
            }
            my_reaction
            reaction_display {
                standard
                extended
            }
            comments {
                comment_id
                user_id
                full_name
                profile_picture
                content
                likes {
                    list
                    count
                }
                created_at {
                    absolute
                    relative
                }
                is_liked
                is_edited
            }
            created_at {
                absolute
                relative
            }
            is_edited
            is_mine
        }
    }
`;
export const GET_POST_REACTIONS = gql`
    query ($postId: String!) {
        getPostReactions(postId: $postId) {
            type
            count
            users {
                user_id
                full_name
                profile_picture
                mutual_friend_count
                friendship_status
            }
        }
    }
`;
export const GET_POST_COMMENT_LIKES = gql`
    query ($postId: String!, $commentId: String!) {
        getPostCommentLikes(postId: $postId, commentId: $commentId) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_status
        }
    }
`;
export const GET_MORE_POST_COMMENTS = gql`
    query ($postId: String!, $skipTimestamp: Int!) {
        getMorePostComments(postId: $postId, skipTimestamp: $skipTimestamp) {
            next_skip_timestamp
            comments {
                comment_id
                user_id
                full_name
                profile_picture
                content
                likes {
                    list
                    count
                }
                created_at {
                    relative
                    absolute
                }
                is_liked
                is_edited
            }
        }
    }
`;
export const GET_FEED = gql`
    query ($skipTimestamp: Int!) {
        getFeed(skipTimestamp: $skipTimestamp) {
            next_skip_timestamp
            posts {
                post_id
                author {
                    user_id
                    full_name
                    profile_picture
                }
                content
                media
                tags {
                    tag_id
                    name
                }
                reactions
                my_reaction
                reaction_display {
                    standard
                    extended
                }
                recent_comments {
                    comment_id
                    user_id
                    full_name
                    profile_picture
                    content
                    likes {
                        list
                        count
                    }
                    created_at {
                        relative
                        absolute
                    }
                    is_liked
                    is_edited
                }
                comment_count
                created_at {
                    absolute
                    relative
                }
                is_edited
                is_mine
            }
        }
    }
`;
