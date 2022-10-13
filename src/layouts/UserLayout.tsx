import { AiFillCalendar } from "react-icons/ai";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { GET_USER_LAYOUT_DATA } from "@queries";
import { Loading } from "components";
import { useTabs } from "hooks";
import { UserLayoutData } from "types";
import { Banner, Tabs } from "common";
import { useEffect, useState, createContext } from "react";
import { client } from "utils";
import { userFriendAction } from "helpers";

interface UserLayoutProps {
    children: React.ReactNode;
}

export const UserContext = createContext<any>(null);

const UserLayout = ({ children }: UserLayoutProps) => {
    const [data, setData] = useState<null | UserLayoutData>(null);
    const router = useRouter();
    const { currentTab, tabList, changeTab } = useTabs([
        { title: "Posts", link: `/users/${router.query.userId}` },
        { title: "Friends", link: `/users/${router.query.userId}/friends` },
        { title: "Groups", link: `/users/${router.query.userId}/groups` },
        { title: "Events", link: `/users/${router.query.userId}/events` },
        { title: "Tags", link: `/users/${router.query.userId}/tags` },
    ]);

    const fetchData = async () => {
        try {
            const response = await client.query({
                query: GET_USER_LAYOUT_DATA,
                variables: { userId: router.query.userId },
            });
            setData(response.data.getUserLayoutData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (router.query.userId) fetchData();
    }, [router.query]);

    if (!data) return <Loading />;

    const action = userFriendAction(data);

    const otherData = [
        { icon: <AiFillCalendar />, text: `Joined ${data.joined_at}` },
        { icon: <FaBirthdayCake />, text: `${data.birthday} (${data.age} years old)` },
    ];

    let friendText: string | null = null;

    if (
        data.friend_privacy === "Everyone" ||
        (data.friend_privacy === "FriendsOnly" && data.friendship_status === "Accepted")
    ) {
        friendText = `${data.friend_count.total} friends (${data.friend_count.mutual} mutual)`;
    } else if (data.friend_privacy !== "Private") {
        friendText = `${data.friend_count.mutual} mutual friends`;
    }
    if (friendText) otherData.unshift({ icon: <FaUserFriends />, text: friendText });

    return (
        <UserContext.Provider value={data}>
            <main>
                <Banner
                    cover="/profile-cover.jpg"
                    image={data.profile_picture}
                    mainText={data.full_name}
                    subText={data.intro}
                    otherData={otherData}
                    action={action}
                />
                <Tabs tabs={tabList} changeTab={changeTab} currentTab={currentTab} />
                {children}
            </main>
        </UserContext.Provider>
    );
};

export default UserLayout;
