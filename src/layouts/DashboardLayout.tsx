import { useState } from "react";
import { useSelector } from "react-redux";

import { StoreInterface } from "types";
import { useTabs } from "hooks";
import { PageHeader, Tabs } from "common";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { currentTab, tabList, changeTab } = useTabs([
        { title: "Post", link: "/dashboard" },
        { title: "Friends", link: "/dashboard/friends" },
        { title: "Groups", link: "/dashboard/groups" },
        { title: "Events", link: "/dashboard/events" },
        { title: "Tags", link: "/dashboard/tags" },
    ]);
    const userStore = useSelector((store: StoreInterface) => store.user);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const subText = userStore.friend_count === 1 ? "1 friend" : `${userStore.friend_count} friends`;

    return (
        <main>
            <PageHeader />
            <Tabs tabs={tabList} changeTab={changeTab} currentTab={currentTab} />
            {children}
        </main>
    );
};

export default DashboardLayout;
