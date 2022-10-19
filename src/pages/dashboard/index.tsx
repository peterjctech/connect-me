import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { DashboardLayout } from "layouts";
import { PostSummary, StoreInterface } from "types";
import { GET_USER_POSTS } from "@queries";
import { Loading, Post } from "components";
import dayjs from "dayjs";
import { client } from "utils";

const DashboardPage = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await client.query({
                query: GET_USER_POSTS,
                variables: {
                    userId: userStore.user_id,
                    isFriend: true,
                    skipTimestamp: dayjs().unix(),
                },
            });
            setData(response.data.getUserPosts);
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <>
            {data.posts.map((post: PostSummary) => {
                return <Post key={post.post_id} post={post} />;
            })}
        </>
    );
};

DashboardPage.PageLayout = DashboardLayout;

export default DashboardPage;
