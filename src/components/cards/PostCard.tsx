import { PostSummary } from "types";

interface PostCardProps {
    post: PostSummary;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div>
            <h1>PostCard</h1>
        </div>
    );
};

export default PostCard;
