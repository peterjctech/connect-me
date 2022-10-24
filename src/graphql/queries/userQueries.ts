import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            user_id
            full_name
            profile_picture
            friend_count
            joined_at
            intro
            birthday
            age
            theme
            color
        }
    }
`;
export const GET_USER_SETTINGS = gql`
    query {
        getUserSettings {
            username
            first_name
            last_name
            intro
            theme
            color
            default_post_is_public
            friend_privacy
            group_privacy
            event_privacy
        }
    }
`;
export const GET_USER_LAYOUT_DATA = gql`
    query ($userId: String!) {
        getUserLayoutData(userId: $userId) {
            user_id
            full_name
            profile_picture
            friend_count {
                total
                mutual
            }
            joined_at
            intro
            birthday
            age
            friend_privacy
            group_privacy
            event_privacy
            friendship_status
        }
    }
`;
export const GET_USER_FRIENDS = gql`
    query ($userId: String!, $isFriend: Boolean!, $privacy: PrivacyOption!) {
        getUserFriends(userId: $userId, isFriend: $isFriend, privacy: $privacy) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_status
        }
    }
`;
export const GET_USER_GROUPS = gql`
    query ($userId: String!, $isFriend: Boolean!, $privacy: PrivacyOption!) {
        getUserGroups(userId: $userId, isFriend: $isFriend, privacy: $privacy) {
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
export const GET_USER_TAGS = gql`
    query ($userId: String!) {
        getUserTags(userId: $userId) {
            tag_id
            name
            color
            is_added
        }
    }
`;
export const GET_USER_POSTS = gql`
    query ($userId: String!, $isFriend: Boolean!, $skipTimestamp: Int!) {
        getUserPosts(userId: $userId, isFriend: $isFriend, skipTimestamp: $skipTimestamp) {
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
                    is_mine
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
export const GET_USER_EVENTS = gql`
    query ($userId: String!, $isFriend: Boolean!, $privacy: PrivacyOption!) {
        getUserEvents(userId: $userId, isFriend: $isFriend, privacy: $privacy) {
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
export const EXPLORE_USERS = gql`
    query ($skipNumber: Int!) {
        exploreUsers(skipNumber: $skipNumber) {
            user_id
            full_name
            profile_picture
            mutual_friend_count
            friendship_status
        }
    }
`;
