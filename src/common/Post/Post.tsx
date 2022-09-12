import { PostSummary, Reaction, CommentData } from "@types";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { BsEmojiAngry } from "react-icons/bs";
import { ImShocked } from "react-icons/im";
import { FaRegSadCry } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { Outline } from "@common";

interface PostProps {
    post: PostSummary;
}

const Post = ({ post }: PostProps) => {
    return (
        <Outline
            image={post.profile_picture}
            text={post.content}
            heading={post.author}
            datetime={{ relative: post.created_at.relative, absolute: post.created_at.absolute }}
        >
            <p>{post.content}</p>
            <img src="/profile-picture.jpg" />
        </Outline>
    );
};

export default Post;
