import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { GET_USER_TAGS } from "@queries";
import { DashboardLayout } from "layouts";
import { StoreInterface, TagSummary } from "types";
import { Loading, TagCard } from "components";

const DashboardTags = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_USER_TAGS, { variables: { userId: userStore.user_id } });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="list-container theme box">
            <h1>{userStore.full_name}'s Tags</h1>
            <section>
                {data.getUserTags.map((tag: TagSummary) => {
                    return <TagCard key={tag.tag_id} tag={tag} />;
                })}
            </section>
        </div>
    );
};

DashboardTags.PageLayout = DashboardLayout;

export default DashboardTags;
