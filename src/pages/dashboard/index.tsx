import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { PostSummary, ProfileData, StoreInterface } from "@types";
import { client } from "@utils";
import { useDialog } from "@hooks";
import { Dialog } from "@common";
import { Header, Tabs, InterestList, UserList, EventList, GroupList, Post } from "@common";
import { GET_PROFILE_DATA } from "@queries";
import { useQuery } from "@apollo/client";
import { Loading } from "@components";

const DashboardPage = () => {
    const tabList = ["Posts", "Friends", "Groups", "Events", "Interests"];
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_PROFILE_DATA);
    const [currentTab, setCurrentTab] = useState(tabList[0]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    if (loading) {
        return <Loading />;
    }

    const res = data.getProfileData;
    console.log(res);

    return (
        <main>
            <Header
                cover={"/cover.jpg"}
                image={userStore.profile_picture}
                mainText={userStore.full_name}
                buttonText="Add Post"
                buttonFunction={toggleModal}
                dateText={res.join_date}
                subText={res.friend_count}
            />
            <Tabs tabs={tabList} changeTab={(tab: string) => setCurrentTab(tab)} currentTab={currentTab} />
            {currentTab === "Posts" &&
                res.posts.map((post: PostSummary, index: number) => {
                    return <Post post={post} key={index} />;
                })}
            {currentTab === "Interests" && <InterestList />}
            {currentTab === "Groups" && <GroupList />}
            {currentTab === "Friends" && <UserList />}
            {currentTab === "Events" && <EventList />}
        </main>
    );
};

export default DashboardPage;
