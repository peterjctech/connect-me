import dayjs from "dayjs";
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS } from "@queries";
import { UserLayout, UserContext } from "layouts";
import { Loading, Post } from "components";
import { PostSummary } from "types";

const UsersIdPage = () => {
    const context = useContext(UserContext);
    const { data, loading } = useQuery(GET_USER_POSTS, {
        variables: {
            userId: context.user_id,
            isFriend: context.friendship_status === "Accepted" ? true : false,
            skipTimestamp: dayjs().unix(),
        },
    });

    if (loading) return <Loading />;

    return (
        <>
            {data.getUserPosts.posts.map((post: PostSummary) => {
                return <Post key={post.post_id} post={post} />;
            })}
        </>
    );
};

UsersIdPage.PageLayout = UserLayout;

export default UsersIdPage;
