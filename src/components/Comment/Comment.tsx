import { useState } from "react";
import { useToast } from "hooks";
import { FaThumbsUp } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { CommentData } from "types";
import { Toast, Tooltip } from "common";
import { useRouter } from "next/router";
import { ReactionModal } from "components";
import { client } from "utils";
import { LIKE_POST_COMMENT, UNLIKE_POST_COMMENT } from "@mutations";

interface CommentProps {
    comment: CommentData;
    parent: {
        type: "Post" | "Event";
        id: string;
    };
    deleteComment?: (commentId: string) => void;
}

const Comment = ({ comment, parent, deleteComment }: CommentProps) => {
    const [isLiked, setIsLiked] = useState(comment.is_liked);
    const [likeCount, setLikeCount] = useState(comment.likes.count);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const { toast, toastProps, openToast } = useToast();

    const unlikeComment = async () => {
        if (parent.type === "Post") {
            const response = await client.mutate({
                mutation: UNLIKE_POST_COMMENT,
                variables: {
                    commentId: comment.comment_id,
                    postId: parent.id,
                },
            });
            if (response.data) {
                openToast(response.data.unlikePostComment.message, "warning");
                setIsLiked(false);
                setLikeCount(comment.is_liked ? comment.likes.count - 1 : comment.likes.count);
            }
        }
    };
    const likeComment = async () => {
        if (parent.type === "Post") {
            const response = await client.mutate({
                mutation: LIKE_POST_COMMENT,
                variables: {
                    commentId: comment.comment_id,
                    postId: parent.id,
                },
            });
            if (response.data) {
                openToast(response.data.likePostComment.message, "info");
                setIsLiked(true);
                setLikeCount(comment.is_liked ? comment.likes.count : comment.likes.count + 1);
            }
        }
    };

    return (
        <div className={`comment${isLiked ? " liked" : ""}`}>
            <img src={comment.profile_picture} alt="" />
            <section>
                <h6 onClick={() => router.push(`/users/${comment.user_id}`)} className="link">
                    {comment.full_name}
                </h6>
                <p>{comment.content}</p>
                <div className="comment__footer">
                    <Tooltip hover={comment.created_at.absolute}>{comment.created_at.relative}</Tooltip>
                    <p>&#x2022;</p>
                    <Tooltip hover={comment.likes.list}>
                        {<FaThumbsUp onClick={isLiked ? unlikeComment : likeComment} className="comment__thumbs" />}{" "}
                        <span onClick={() => setShowModal(true)}>{likeCount}</span>
                    </Tooltip>
                </div>
            </section>
            {toast && <Toast {...toastProps} />}
            {showModal && (
                <ReactionModal
                    closeModal={() => setShowModal(false)}
                    eventId={parent.type === "Event" ? parent.id : undefined}
                    postId={parent.type === "Post" ? parent.id : undefined}
                    commentId={comment.comment_id}
                />
            )}
            {comment.is_mine && deleteComment && (
                <BsFillTrashFill onClick={() => deleteComment(comment.comment_id)} className="comment__delete" />
            )}
        </div>
    );
};

export default Comment;
