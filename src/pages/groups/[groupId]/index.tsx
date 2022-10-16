import dayjs from "dayjs";
import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GROUP_POSTS } from "@queries";
import { GroupLayout, GroupContext } from "layouts";
import { Loading, Post } from "components";
import { PostSummary } from "types";

const GroupPage = () => {
    const [skip, setSkip] = useState(dayjs().unix());
    const context = useContext(GroupContext);
    const { data, loading } = useQuery(GET_GROUP_POSTS, {
        variables: {
            groupId: context.group_id,
            skipTimestamp: skip,
        },
    });

    if (loading) return <Loading />;

    return (
        <>
            {data.getGroupPosts.posts.map((post: PostSummary) => {
                return <Post key={post.post_id} post={post} />;
            })}
        </>
    );
};

GroupPage.PageLayout = GroupLayout;

export default GroupPage;
