import { useQuery } from "@apollo/client";

import { GET_POSTS } from "@queries";
import { Loading, Post } from "@components";
import { PostData } from "@types";

interface PostsProps {
    id: string;
    type: "Group" | "User";
}

const Posts = (props: PostsProps) => {
    const { loading, data } = useQuery(GET_POSTS, { variables: props });

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {data.getPosts.map((post: PostData) => {
                return <Post post={post} key={post.post_id} />;
            })}
        </>
    );
};

export default Posts;
