import { useQuery } from "@apollo/client";

import { GET_FRIENDS } from "@queries";
import { Loading } from "@components";

interface FriendsListProps {
    userId: string;
    name: string;
}

const FriendsList = ({ userId, name }: FriendsListProps) => {
    const { loading, data } = useQuery(GET_FRIENDS, { variables: { userId } });
    if (loading) {
        return <Loading />;
    }

    console.log(data);
    return (
        <div className="box theme list-container">
            <h1>{name}'s Friends</h1>
            <div className="list"></div>
        </div>
    );
};

export default FriendsList;
