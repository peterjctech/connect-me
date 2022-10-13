import { gql } from "@apollo/client";

export const GET_GROUP_LAYOUT_DATA = gql`
    query ($groupId: String!) {
        getGroupLayoutData(groupId: $groupId) {
            owner {
                user_id
                full_name
                profile_picture
            }
            name
            description
            group_image
            member_count {
                total
                friends
            }
            created_at {
                relative
                absolute
            }
            restriction
            is_authorized
            is_admin
            is_member
        }
    }
`;
export const GET_GROUP_POSTS = gql`
    query ($groupId: String!, $skipTimestamp: Int!) {
        getGroupPosts(groupId: $groupId, skipTimestamp: $skipTimestamp) {
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
export const GET_GROUP_MEMBERS = gql`
    query ($groupId: String!) {
        getGroupMembers(groupId: $groupId, skipTimestamp: $skipTimestamp) {
            admins {
                user_id
                full_name
                profile_picture
            }
            members {
                user_id
                full_name
                profile_picture
            }
            invited {
                user_id
                full_name
                profile_picture
            }
            requested {
                user_id
                full_name
                profile_picture
            }
            banned {
                user_id
                full_name
                profile_picture
            }
        }
    }
`;
export const GET_GROUP_EVENTS = gql`
    query ($groupId: String!, $isMember: Boolean!) {
        getGroupEvents(groupId: $groupId, isMember: $isMember) {
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
export const GET_GROUP_TAGS = gql`
    query ($groupId: String!) {
        getGroupTags(groupId: $groupId) {
            tag_id
            name
            color
            is_added
        }
    }
`;
export const EXPLORE_GROUPS = gql`
    query ($skipNumber: Int!) {
        exploreGroups(skipNumber: $skipNumber) {
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
