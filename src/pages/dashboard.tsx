import { useSelector } from "react-redux";
import { useState } from "react";

import { StoreInterface } from "@types";
import { Banner, Tabs } from "@common";
import { InterestList, UserList, EventList, GroupList, PostList } from "@components";
import { useTabs } from "@hooks";

const DashboardPage = () => {
    const { currentTab, tabList, changeTab } = useTabs(["Posts", "Friends", "Groups", "Events", "Interests"]);
    const userStore = useSelector((store: StoreInterface) => store.user);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <main>
            <Banner
                cover="/profile-cover.jpg"
                image={userStore.profile_picture}
                mainText={userStore.full_name}
                buttonText="Add Post"
                buttonFunction={toggleModal}
                dateText={userStore.join_date}
                subText={`${userStore.friend_count} friends`}
            />
            <Tabs tabs={tabList} changeTab={changeTab} currentTab={currentTab} />
            {currentTab === "Posts" && <PostList id={userStore.user_id} type="User" />}
            {currentTab === "Friends" && (
                <UserList title={`${userStore.full_name}'s friends`} id={userStore.user_id} type="Friends" />
            )}
            {currentTab === "Groups" && (
                <GroupList userId={userStore.user_id} title={`${userStore.full_name}'s groups`} />
            )}
            {currentTab === "Events" && <EventList />}
            {currentTab === "Interests" && <InterestList />}
        </main>
    );
};

export default DashboardPage;
