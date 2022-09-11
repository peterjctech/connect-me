import { PostSummary, Reaction, CommentData } from "@types";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { BsEmojiAngry } from "react-icons/bs";
import { ImShocked } from "react-icons/im";
import { FaRegSadCry } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";

interface PostProps {
    post: PostSummary;
}

const Post = ({ post }: PostProps) => {
    console.log(post);
    const reactionIcons = {
        Like: <span key="Like">&#128077;</span>,
        Love: <span key="Love">&#10084;&#65039;</span>,
        Angry: <span key="Angry">&#x1F621;</span>,
        Wow: <span key="Wow">&#128562;</span>,
        Sad: <span key="Sad">&#128546;</span>,
    };
    return (
        <div className="post container">
            <header>
                <img src={post.profile_picture} className="pfp--md" />
                <h6>{post.author}</h6>
                <p>{post.created_at.relative}</p>
                {post.is_mine && <HiPencil />}
            </header>
            <section>
                <p>{post.content}</p>
            </section>
            <div className="post__reactions">
                {post.reactions.map((reaction) => {
                    let emoji = reactionIcons[reaction.type];
                    return emoji;
                })}
                <span className="post__reaction-display">{post.reaction_display}</span>
                <span className="post__reaction-count">{post.reaction_count}</span>
            </div>
            <footer>
                {post.recent_comments.map((comment) => {
                    return <div className="post__comment">{comment.content}</div>;
                })}
            </footer>
        </div>
    );
};

export default Post;
