import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { DashboardLayout } from "layouts";
import { PostSummary, StoreInterface } from "types";
import { GET_USER_POSTS } from "@queries";
import { PostCard } from "components";
import dayjs from "dayjs";

const DashboardPage = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { data, loading } = useQuery(GET_USER_POSTS, {
        variables: {
            userId: userStore.user_id,
            isFriend: true,
            skipTimestamp: dayjs().unix(),
        },
    });

    if (loading) {
        return <h1>Loading</h1>;
    }

    console.log(data);

    return (
        <>
            {data.getUserPosts.posts.map((post: PostSummary) => {
                return <PostCard key={post.post_id} post={post} />;
            })}
        </>
    );
};

DashboardPage.PageLayout = DashboardLayout;

export default DashboardPage;
