import { gql } from "@apollo/client";

export const GET_TAG_POSTS = gql`
    query ($tagId: String!, $skipTimestamp: Int!) {
        getTagPosts(tagId: $tagId, skipTimestamp: $skipTimestamp) {
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
export const GET_TAG_LAYOUT_DATA = gql`
    query ($tagId: String!) {
        getTagLayoutData(tagId: $tagId) {
            tag_id
            name
            color
            is_added
            user_count
            friends {
                list
                count
            }
        }
    }
`;
export const GET_TAG_USERS = gql`
    query ($tagId: String!) {
        getTagUsers(tagId: $tagId) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_status
        }
    }
`;
export const GET_TAG_GROUPS = gql`
    query ($tagId: String!) {
        getTagGroups(tagId: $tagId) {
            group_id
            name
            group_image
            member_count {
                total
                friends
            }
            restriction
            my_status
        }
    }
`;
export const GET_TAG_EVENTS = gql`
    query ($tagId: String!) {
        getTagEvents(tagId: $tagId) {
            event_id
            name
            user_id
            group_id
            picture
            reference_name
            confirmed_count {
                total
                friends
            }
            datetime
            my_status
        }
    }
`;
export const EXPLORE_TAGS = gql`
    query ($skipNumber: Int!) {
        exploreTags(skipNumber: $skipNumber) {
            tag_id
            name
            color
            is_added
        }
    }
`;
