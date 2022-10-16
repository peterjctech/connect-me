import { AiFillCalendar } from "react-icons/ai";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { GET_GROUP_LAYOUT_DATA } from "@queries";
import { Loading } from "components";
import { useTabs } from "hooks";
import { GroupLayoutData } from "types";
import { Banner, Tabs } from "common";
import { useEffect, useState, createContext } from "react";
import { client } from "utils";
import { groupAction } from "helpers";

interface GroupLayoutProps {
    children: React.ReactNode;
}

export const GroupContext = createContext<any>(null);

const GroupLayout = ({ children }: GroupLayoutProps) => {
    const [data, setData] = useState<null | GroupLayoutData>(null);
    const router = useRouter();
    const { currentTab, tabList, changeTab } = useTabs([
        { title: "Posts", link: `/groups/${router.query.groupId}` },
        { title: "Members", link: `/groups/${router.query.groupId}/users` },
        { title: "Events", link: `/groups/${router.query.groupId}/events` },
        { title: "Tags", link: `/groups/${router.query.groupId}/tags` },
    ]);

    const fetchData = async () => {
        try {
            const response = await client.query({
                query: GET_GROUP_LAYOUT_DATA,
                variables: { groupId: router.query.groupId },
            });
            setData(response.data.getGroupLayoutData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (router.query.groupId) fetchData();
    }, [router.query]);

    if (!data) return <Loading />;

    const action = groupAction(data);

    const otherData = [
        { icon: <FaBirthdayCake />, text: `Created at ${data.created_at.absolute}` },
        { icon: <FaBirthdayCake />, text: `${data.member_count.total} members (${data.member_count.friends} friends)` },
    ];

    return (
        <GroupContext.Provider value={data}>
            <main>
                <Banner
                    cover="/group-cover.jpg"
                    image={data.group_image}
                    mainText={data.name}
                    subText={data.description}
                    otherData={otherData}
                    action={action}
                />
                <Tabs tabs={tabList} changeTab={changeTab} currentTab={currentTab} />
                {children}
            </main>
        </GroupContext.Provider>
    );
};

export default GroupLayout;
