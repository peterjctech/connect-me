import { AiFillCalendar } from "react-icons/ai";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";

import { StoreInterface } from "types";
import { useTabs } from "hooks";
import { Banner, Tabs } from "common";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { currentTab, tabList, changeTab } = useTabs([
        { title: "Posts", link: "/dashboard" },
        { title: "Friends", link: "/dashboard/friends" },
        { title: "Groups", link: "/dashboard/groups" },
        { title: "Events", link: "/dashboard/events" },
        { title: "Tags", link: "/dashboard/tags" },
    ]);
    const userStore = useSelector((store: StoreInterface) => store.user);

    const otherData = [
        { icon: <FaUserFriends />, text: `${userStore.friend_count} friends` },
        { icon: <AiFillCalendar />, text: `Joined ${userStore.joined_at}` },
        { icon: <FaBirthdayCake />, text: `${userStore.birthday} (${userStore.age} years old)` },
    ];

    return (
        <main>
            <Banner
                cover="/profile-cover.jpg"
                image={userStore.profile_picture}
                mainText={userStore.full_name}
                subText={userStore.intro}
                otherData={otherData}
            />
            <Tabs tabs={tabList} changeTab={changeTab} currentTab={currentTab} />
            {children}
        </main>
    );
};

export default DashboardLayout;
