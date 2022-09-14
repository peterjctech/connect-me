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
            isEdited
            canEdit
            tags={post.tags}
        >
            <h1>Hello</h1>
        </Outline>
    );
};

export default Post;
