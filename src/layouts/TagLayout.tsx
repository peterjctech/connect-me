import { AiFillCalendar } from "react-icons/ai";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { GET_TAG_LAYOUT_DATA } from "@queries";
import { Loading } from "components";
import { useTabs } from "hooks";
import { TagLayoutData } from "types";
import { Banner, Button, Tabs } from "common";
import { useEffect, useState, createContext } from "react";
import { client } from "utils";
import { tagAction, userFriendAction } from "helpers";

interface TagLayoutProps {
    children: React.ReactNode;
}

export const TagContext = createContext<any>(null);

const TagLayout = ({ children }: TagLayoutProps) => {
    const [data, setData] = useState<null | TagLayoutData>(null);
    const router = useRouter();
    const { currentTab, tabList, changeTab } = useTabs([
        { title: "Posts", link: `/tags/${router.query.tagId}` },
        { title: "Users", link: `/tags/${router.query.tagId}/users` },
        { title: "Groups", link: `/tags/${router.query.tagId}/groups` },
        { title: "Events", link: `/tags/${router.query.tagId}/events` },
    ]);

    const fetchData = async () => {
        try {
            const response = await client.query({
                query: GET_TAG_LAYOUT_DATA,
                variables: { tagId: router.query.tagId },
            });
            console.log(response);
            setData(response.data.getTagLayoutData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (router.query.tagId) fetchData();
    }, [router.query]);

    if (!data) return <Loading />;

    const action = tagAction(data);

    return (
        <TagContext.Provider value={data}>
            <main>
                <div className={`tag-bg ${data.color}`}>
                    <h3>{data.name}</h3>
                    <h5>
                        {data.user_count} users added ({data.friends.count} friends)
                    </h5>
                    <Button click={() => action.action({ tagId: data.tag_id })} type={action.button} squared>
                        {action.text}
                    </Button>
                </div>
                <Tabs tabs={tabList} changeTab={changeTab} currentTab={currentTab} />
                {children}
            </main>
        </TagContext.Provider>
    );
};

export default TagLayout;
