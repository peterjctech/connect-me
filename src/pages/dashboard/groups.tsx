import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { GET_USER_GROUPS } from "@queries";
import { DashboardLayout } from "layouts";
import { StoreInterface, GroupSummary } from "types";
import { Loading, GroupCard } from "components";

const DashboardGroups = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_USER_GROUPS, {
        variables: { userId: userStore.user_id, isFriend: false, privacy: "Everyone" },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="list-container lg theme box">
            <h1>{userStore.full_name}&apos;s Groups</h1>
            <section>
                {data.getUserGroups.map((group: GroupSummary) => {
                    return <GroupCard key={group.group_id} group={group} />;
                })}
            </section>
        </div>
    );
};

DashboardGroups.PageLayout = DashboardLayout;

export default DashboardGroups;
