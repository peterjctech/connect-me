import { PostData } from "@types";
import { Outline } from "@common";

interface PostProps {
    // post: PostData;
}

const Post = ({}: PostProps) => {
    return (
        <h1>Post</h1>
        // <Outline
        //     image={post.profile_picture}
        //     heading={post.author}
        //     datetime={{ relative: post.created_at.relative, absolute: post.created_at.absolute }}
        //     reactions={{ all: post.reactions, display: post.reaction_display }}
        //     comments={{ all: post.recent_comments, count: post.comment_count }}
        //     canEdit={post.is_mine}
        // >
        //     <p>{post.content}</p>
        //     {post.picture && <img src={post.picture} />}
        // </Outline>
    );
};

export default Post;
