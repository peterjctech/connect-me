import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { BsDot, BsFillReplyFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { PostSummary } from "types";
import { Tooltip, Input } from "common";
import { Comment, Tag, ReactionModal } from "components";
import { useForm } from "hooks";
import { htmlEmojis } from "helpers";

interface PostProps {
    post: PostSummary;
}

const Post = ({ post }: PostProps) => {
    const [showModal, setShowModal] = useState(false);
    const [reactionData, setReactionData] = useState([]);
    const router = useRouter();
    const { formData, handleChange } = useForm({
        comment: "",
    });
    const toggleModal = () => setShowModal(!showModal);

    const navigateToMain = () => {
        router.push(`/posts/${post.post_id}`);
    };

    // TODO: handleShowReactions
    const handleShowReactions = async () => {
        console.log("handleShowReactions");
    };

    // TODO: commentOnPost
    const commentOnPost = async () => {
        console.log(formData.comment);
    };

    return (
        <div className="post theme box">
            <header>
                <img src={post.author.profile_picture} className="img--md" alt="" />
                <h6 onClick={() => router.push(`/users/${post.author.user_id}`)} className="link">
                    {post.author.full_name}
                </h6>
                <span>
                    <Tooltip hover={post.created_at.absolute}>{post.created_at.relative}</Tooltip>
                    {post.is_edited && (
                        <p className="post__edited">
                            <BsDot onClick={() => setShowModal(true)} />
                            edited
                        </p>
                    )}
                </span>
                {post.is_mine && <HiPencil />}
            </header>
            <hr />
            <section>
                <p>{post.content}</p>
                {post.media && <img src={post.media} alt="" />}
            </section>
            <hr />
            {post.tags.length > 0 && (
                <>
                    <aside>
                        {post.tags.map((tag) => {
                            return <Tag tag={tag} key={tag.tag_id} />;
                        })}
                    </aside>
                    <hr />
                </>
            )}
            {post.reactions && (
                <>
                    <summary>
                        {post.reactions.map((reaction) => {
                            return (
                                <div onClick={handleShowReactions} key={reaction}>
                                    {htmlEmojis[reaction]}
                                </div>
                            );
                        })}
                        <span className="post__react--extended" onClick={toggleModal}>
                            {post.reaction_display.extended}
                        </span>
                        <span className="post__react--standard" onClick={toggleModal}>
                            {post.reaction_display.standard}
                        </span>
                        <div className="post__like">{<FaThumbsUp />}</div>
                    </summary>
                    <hr />
                    {showModal && <ReactionModal closeModal={toggleModal} postId={post.post_id} />}
                </>
            )}
            {post.recent_comments.length > 0 && (
                <footer>
                    {post.recent_comments.length > 3 && (
                        <div className="post__expand link" onClick={navigateToMain}>
                            See all {post.comment_count} comments
                        </div>
                    )}
                    {post.recent_comments.map((comment) => {
                        return (
                            <Comment
                                comment={comment}
                                parent={{ id: post.post_id, type: "Post" }}
                                key={comment.comment_id}
                            />
                        );
                    })}
                    <br />
                    <Input
                        name="comment"
                        value={formData.comment}
                        handleChange={handleChange}
                        placeholder="Add a comment..."
                        noLabel
                        iconRight={<BsFillReplyFill onClick={commentOnPost} />}
                    />
                </footer>
            )}
        </div>
    );
};

export default Post;
