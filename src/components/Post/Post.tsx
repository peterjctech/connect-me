import { PostData } from "@types";
import { Outline } from "@common";

interface PostProps {
    post: PostData;
}

const Post = ({ post }: PostProps) => {
    return (
        <Outline
            image={post.profile_picture}
            heading={post.author.name}
            datetime={{ main: post.created_at.relative, hover: post.created_at.absolute }}
            isEdited={post.is_edited}
            canEdit
            tags={post.tags}
            reactions={{ summary: post.reactions, display: post.reaction_display }}
            comments={{ list: post.recent_comments, count: post.comment_count }}
        >
            {post.content}
            {post.picture && <img src={post.picture} />}
        </Outline>
    );
};

export default Post;
