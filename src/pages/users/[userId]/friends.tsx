import { useState, useEffect, useContext } from "react";
import { GET_USER_FRIENDS } from "@queries";
import { UserLayout, UserContext } from "layouts";
import { UserSummary } from "types";
import { Loading, UserCard } from "components";
import { client } from "utils";

const UsersUserIdFriends = () => {
    const [data, setData] = useState<null | UserSummary[]>(null);
    const context = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_USER_FRIENDS,
                    variables: {
                        userId: context.user_id,
                        isFriend: context.friendship_status === "Accepted",
                        privacy: context.friend_privacy,
                    },
                });
                setData(response.data.getUserFriends);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, [context]);

    if (!data) return <Loading />;

    return (
        <div className="list-container theme box">
            <h1>{context.full_name}&apos;s Friends</h1>
            <section>
                {data.map((user: UserSummary) => {
                    return <UserCard key={user.user_id} user={user} />;
                })}
            </section>
        </div>
    );
};

UsersUserIdFriends.PageLayout = UserLayout;

export default UsersUserIdFriends;
