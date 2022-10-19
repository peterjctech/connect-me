import { useState, useEffect } from "react";
import { Reaction, ReactionData } from "types";
import { htmlEmojis, userFriendAction } from "helpers";
import { Button, Modal } from "common";
import { Loading } from "components";
import { client } from "utils";
import { GET_POST_COMMENT_LIKES, GET_POST_REACTIONS } from "@queries";
import Link from "next/link";

interface ReactionModalProps {
    closeModal: () => void;
    postId?: string;
    eventId?: string;
    commentId?: string;
}

const ReactionModal = ({ closeModal, postId, eventId, commentId }: ReactionModalProps) => {
    const [reactions, setReactions] = useState<ReactionData[]>([]);
    const [tab, setTab] = useState<null | Reaction>(null);
    const [loading, setLoading] = useState(true);
    const getPostReactions = async (props: { postId: string }) => {
        const response = await client.query({ query: GET_POST_REACTIONS, variables: props });
        const data = response.data.getPostReactions;
        setReactions(data);
        setTab(data[0].type);
        setLoading(false);
    };
    const getEventReactions = async (props: { eventId: string }) => {
        console.log("getEventReactions");
    };
    const getPostCommentLikes = async (props: { postId: string; commentId: string }) => {
        const response = await client.query({ query: GET_POST_COMMENT_LIKES, variables: props });
        setReactions([
            {
                type: "Like",
                users: response.data.getPostCommentLikes,
                count: response.data.getPostCommentLikes.length,
            },
        ]);
        setTab("Like");
        setLoading(false);
    };
    const getEventCommentLikes = async (props: { eventId: string; commentId: string }) => {
        console.log("getEventCommentLikes");
    };

    useEffect(() => {
        if (commentId) {
            if (postId) getPostCommentLikes({ postId: postId, commentId: commentId });
            if (eventId) getEventCommentLikes({ eventId: eventId, commentId: commentId });
        } else {
            if (postId) getPostReactions({ postId: postId });
            if (eventId) getEventReactions({ eventId: eventId });
        }
    }, [commentId, eventId, postId]);

    if (loading) {
        return (
            <Modal closeModal={closeModal} className="reaction-modal">
                <Loading variant="fill" />
            </Modal>
        );
    }

    const users = reactions.filter((obj) => obj.type === tab)[0].users;

    return (
        <Modal closeModal={closeModal} className="reaction-modal">
            <header>
                {reactions.map((reaction) => {
                    return (
                        <div
                            onClick={() => setTab(reaction.type)}
                            className={tab === reaction.type ? "active" : ""}
                            key={reaction.type}
                        >
                            {htmlEmojis[reaction.type]}
                        </div>
                    );
                })}
            </header>
            <section>
                {users.map((user) => {
                    const action = userFriendAction(user);

                    return (
                        <div className="reaction-modal__user" key={user.user_id}>
                            <img src={user.profile_picture} className="img--mdlg" alt="" />
                            <Link href={`/users/${user.user_id}`}>{user.full_name}</Link>
                            {user.mutual_friend_count && <p>{user.mutual_friend_count} mutual friends</p>}
                            {action && (
                                <Button click={() => action.action({ userId: user.user_id })} type={action.button}>
                                    {action.text}
                                </Button>
                            )}
                        </div>
                    );
                })}
            </section>
        </Modal>
    );
};

export default ReactionModal;
