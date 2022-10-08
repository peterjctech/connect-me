import { gql } from "@apollo/client";

export const GET_TAG_POSTS = gql`
    query ($tagId: String!, $skipTimestamp: Int!) {
        getTagPosts(tagId: $tagId, skipTimestamp: $skipTimestamp) {
            next_skip_timestamp
            posts {
                post_id
                author {
                    id
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
                        absolute
                        relative
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
