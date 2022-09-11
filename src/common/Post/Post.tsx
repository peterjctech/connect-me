import { PostSummary, Reaction, CommentData } from "@types";

interface PostProps {
    post: PostSummary;
}

const Post = ({ post }: PostProps) => {
    console.log(post);
    return (
        <div className="post container">
            <img src={post.profile_picture} className="pfp--sm" />
            <h6>{post.author}</h6>
            <p>{post.created_at.relative}</p>
            <p>{post.content}</p>
        </div>
    );
};

export default Post;
