import dayjs from "dayjs";
import { GET_FEED } from "@queries";
import { Loading, Post } from "components";
import { useState, useEffect } from "react";
import { PostSummary } from "types";
import { client } from "utils";
import { Button } from "common";
import { useRouter } from "next/router";

const FeedPage = () => {
    const router = useRouter();
    const [skipTimestamp, setSkipTimestamp] = useState(dayjs().unix());
    const [data, setData] = useState<null | PostSummary[]>(null);

    const getData = async () => {
        try {
            const response = await client.query({ query: GET_FEED, variables: { skipTimestamp } });
            setSkipTimestamp(response.data.getFeed.next_skip_timestamp);
            setData(response.data.getFeed.posts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (!data) return <Loading variant="page" />;

    return (
        <main>
            {data.map((post: PostSummary) => {
                return <Post key={post.post_id} post={post} />;
            })}
        </main>
    );
};

export default FeedPage;
