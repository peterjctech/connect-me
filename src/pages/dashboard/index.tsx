import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { PostData, UserData, StoreInterface } from "@types";
import { Header, Tabs } from "@common";
import { InterestList, UserList, EventList, GroupList, Post } from "@components";
import { GET_USER_DATA } from "@queries";
import { useQuery } from "@apollo/client";
import { Loading } from "@components";

const DashboardPage = () => {
    const tabList = ["Posts", "Friends", "Groups", "Events", "Interests"];
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_USER_DATA, { variables: { id: userStore.user_id } });
    const [currentTab, setCurrentTab] = useState(tabList[0]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    if (loading) {
        return <Loading />;
    }

    const res = data.getUserData;

    return (
        <main>
            <Header
                cover={"/profile-cover.jpg"}
                image={res.profile_picture}
                mainText={res.full_name}
                buttonText="Add Post"
                buttonFunction={toggleModal}
                dateText={res.join_date}
                subText={res.friend_count}
            />
            <Tabs tabs={tabList} changeTab={(tab: string) => setCurrentTab(tab)} currentTab={currentTab} />
            {currentTab === "Posts" && <Post />}
            {currentTab === "Friends" && (
                <UserList title={`${userStore.full_name}'s friends`} userId={userStore.user_id} />
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
