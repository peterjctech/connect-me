import { gql } from "@apollo/client";

export const INITIALIZE_STORE = gql`
    query {
        initializeStore {
            id
            full_name
            profile_picture
            theme
        }
    }
`;

export const GET_ALL_USERS = gql`
    query {
        users {
            id
            full_name
            profile_picture
            mutual_friend_count
            is_friend
        }
    }
`;

export const GET_USER_DATA = gql`
    query ($userId: ID!) {
        getUserData(userId: $userId) {
            id
            full_name
            profile_picture
            join_date
            is_friend
            friends {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
            mutual_friend_count
            friend_count
            groups {
                id
                group
                description
                group_image
                my_status
                is_joined
                join_restriction
                user_count
                friends_in_group_count
            }
            posts {
                id
                author {
                    id
                    full_name
                    profile_picture
                    mutual_friend_count
                    is_friend
                }
                is_mine
                content
                picture
                reaction_list
                reaction_summary
                comment_count
                created_at
                is_edited
            }
            mutual_group_count
            mutual_interest_count
            interests {
                id
                interest
                color
                is_added
            }
            events {
                id
                event
                my_status
                creator_id
                creator_name
                group_id
                group_name
                description
                confirmed_count
                maybe_count
                reaction_list
                reaction_summary
                comment_count
                starts_at
                ends_at
            }
        }
    }
`;

export const GET_PROFILE_DATA = gql`
    query {
        getProfileData {
            id
            full_name
            profile_picture
            join_date
            friends {
                id
                full_name
                profile_picture
                mutual_friend_count
                friendship_date
            }
            friend_count
            groups {
                id
                group
                description
                group_image
                my_status
                is_joined
                join_restriction
                user_count
                friends_in_group_count
            }
            group_count
            posts {
                id
                author {
                    id
                    full_name
                    profile_picture
                    mutual_friend_count
                    is_friend
                }
                is_mine
                content
                picture
                reaction_list
                reaction_summary
                comment_count
                created_at
                is_edited
            }
            interests {
                id
                interest
                color
                is_added
            }
            interest_count
            events {
                id
                event
                my_status
                creator_id
                creator_name
                group_id
                group_name
                description
                confirmed_count
                maybe_count
                reaction_list
                reaction_summary
                comment_count
                starts_at
                ends_at
            }
            event_count
        }
    }
`;
