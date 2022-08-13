import { gql } from "@apollo/client";

export const GET_GROUP_DATA = gql`
    query ($groupId: ID!) {
        getGroupData(groupId: $groupId) {
            id
            group
            description
            group_image
            my_status
            is_joined
            join_restriction
            user_count
            friends_in_group_count
            member_count
            admin_count
            founder_id
            founder_name
            users {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
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
            join_date
            created_at
            update_history {
                updated_by {
                    id
                    full_name
                    profile_picture
                    mutual_friend_count
                    is_friend
                }
                update
                updated_at
            }
            join_requests {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
            banned_users {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
        }
    }
`;
