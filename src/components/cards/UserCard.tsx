import { UserSummary } from "types";
import { Button } from "common";
import { useRouter } from "next/router";
import { userFriendAction } from "helpers";

interface UserCardProps {
    user: UserSummary;
}

const UserCard = ({ user }: UserCardProps) => {
    const router = useRouter();
    const action = userFriendAction(user);

    const navigate = () => router.push(`/users/${user.user_id}`);

    return (
        <div className="user-card bordered">
            <img src={user.profile_picture} onClick={navigate} alt="" />
            <div className="user-card__content">
                <h6 onClick={navigate} className="user-card__title">
                    {user.full_name}
                </h6>
                {user.mutual_friend_count && <p>{user.mutual_friend_count} mutual friends</p>}
                {user.mutual_friend_count && action && (
                    <Button click={() => action.action({ userId: user.user_id })} type={action.button} squared>
                        {action.text}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserCard;
