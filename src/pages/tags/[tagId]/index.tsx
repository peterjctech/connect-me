import dayjs from "dayjs";
import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TAG_POSTS } from "@queries";
import { TagLayout, TagContext } from "layouts";
import { Loading, Post } from "components";
import { PostSummary } from "types";

const TagPage = () => {
    const [skip, setSkip] = useState(dayjs().unix());
    const context = useContext(TagContext);
    const { data, loading } = useQuery(GET_TAG_POSTS, {
        variables: {
            tagId: context.tag_id,
            skipTimestamp: skip,
        },
    });

    if (loading) return <Loading />;

    return (
        <>
            {data.getTagPosts.posts.map((post: PostSummary) => {
                return <Post key={post.post_id} post={post} />;
            })}
        </>
    );
};

TagPage.PageLayout = TagLayout;

export default TagPage;
