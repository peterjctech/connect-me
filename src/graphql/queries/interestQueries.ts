import { gql } from "@apollo/client";

export const GET_INTEREST_DATA = gql`
    query ($interestId: ID!) {
        getInterestData(interestId: $interestId) {
            id
            interest
            color
            is_added
            users {
                id
                full_name
                profile_picture
                mutual_friend_count
                is_friend
            }
            friend_count
            total_count
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
        }
    }
`;
