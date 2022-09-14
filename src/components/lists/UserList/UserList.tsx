import { useQuery } from "@apollo/client";

import { Loading } from "@components";
import { Card } from "@common";
import { UserSummary } from "@types";

interface UserListProps {
    title: string;
    userId: string;
}

const UserList = ({ title, userId }: UserListProps) => {
    // const { loading, data } = useQuery(GET_FRIENDS, { variables: { id: userId } });

    // if (loading) {
    //     return <Loading />;
    // }

    return (
        <div className="container list-container">
            {/* <h1>{title}</h1>
            <div className="card-list">
                {data.getFriends.map((obj: UserSummary) => {
                    const link = `/users/${obj.user_id}`;
                    return (
                        <Card title={obj.full_name} picture={obj.profile_picture} titleLink={link}>
                            <a>{obj.mutual_friend_count} mutual friends</a>
                            {obj.friendship_date && <p>Friended on {obj.friendship_date}</p>}
                        </Card>
                    );
                })}
            </div> */}
        </div>
    );
};

export default UserList;
