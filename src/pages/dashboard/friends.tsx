import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_USER_FRIENDS } from "@queries";
import { DashboardLayout } from "layouts";
import { StoreInterface, UserSummary } from "types";
import { Loading, UserCard } from "components";

const DashboardFriends = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_USER_FRIENDS, {
        variables: { userId: userStore.user_id, isFriend: false, privacy: "Everyone" },
    });

    if (loading) return <Loading />;

    return (
        <div className="list-container theme box">
            <h1>{userStore.full_name}&apos;s Friends</h1>
            <section>
                {data.getUserFriends.map((user: UserSummary) => {
                    return <UserCard key={user.user_id} user={user} />;
                })}
            </section>
        </div>
    );
};

DashboardFriends.PageLayout = DashboardLayout;

export default DashboardFriends;
