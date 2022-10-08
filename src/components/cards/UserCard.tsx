import { UserSummary } from "types";

interface UserCardProps {
    user: UserSummary;
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div>
            <h1>UserCard</h1>
        </div>
    );
};

export default UserCard;
