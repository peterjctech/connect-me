import { PostSummary } from "@types";
import { Outline } from "@common";

interface PostProps {
    post: PostSummary;
}

const Post = ({ post }: PostProps) => {
    return (
        <Outline
            image={post.profile_picture}
            heading={post.author}
            datetime={{ relative: post.created_at.relative, absolute: post.created_at.absolute }}
            reactions={{ all: post.reactions, count: post.reaction_count, display: post.reaction_display }}
            comments={{ all: post.recent_comments, count: post.comment_count }}
            canEdit={post.is_mine}
        >
            <p>{post.content}</p>
            <img src="/profile-picture.jpg" />
        </Outline>
    );
};

export default Post;
