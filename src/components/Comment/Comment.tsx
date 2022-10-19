import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { CommentData } from "types";
import { Tooltip } from "common";
import { useRouter } from "next/router";
import { ReactionModal } from "components";

interface CommentProps {
    comment: CommentData;
    parent: {
        type: "Post" | "Event";
        id: string;
    };
}

const Comment = ({ comment, parent }: CommentProps) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    // TODO: likeComment
    const likeComment = async () => {
        console.log("likeComment");
    };

    return (
        <div className={`comment${comment.is_liked ? " liked" : ""}`}>
            <img src={comment.profile_picture} />
            <section>
                <h6 onClick={() => router.push(`/users/${comment.user_id}`)} className="link">
                    {comment.full_name}
                </h6>
                <p>{comment.content}</p>
                <div className="comment__footer">
                    <Tooltip hover={comment.created_at.absolute}>{comment.created_at.relative}</Tooltip>
                    <p>&#x2022;</p>
                    <Tooltip hover={comment.likes.list}>
                        {<FaThumbsUp onClick={likeComment} />}{" "}
                        <span onClick={() => setShowModal(true)}>{comment.likes.count}</span>
                    </Tooltip>
                </div>
            </section>
            {showModal && (
                <ReactionModal
                    closeModal={() => setShowModal(false)}
                    eventId={parent.type === "Event" ? parent.id : undefined}
                    postId={parent.type === "Post" ? parent.id : undefined}
                    commentId={comment.comment_id}
                />
            )}
        </div>
    );
};

export default Comment;
