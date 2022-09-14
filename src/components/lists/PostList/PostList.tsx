import { useQuery } from "@apollo/client";

import { GET_POSTS } from "@queries";
import { Loading, Post } from "@components";
import { PostData } from "@types";

interface PostListProps {
    id: string;
    type: "Group" | "User";
}

const PostList = (props: PostListProps) => {
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

export default PostList;
