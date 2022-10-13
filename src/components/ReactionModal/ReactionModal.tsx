import { useState } from "react";
import { ReactionData } from "types";
import { htmlEmojis } from "helpers";
import { Modal } from "common";

interface ReactionModalProps {
    closeModal: () => void;
    reactions: ReactionData[];
}

const ReactionModal = ({ closeModal, reactions }: ReactionModalProps) => {
    const [tab, setTab] = useState(reactions[0].type);
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
                    return <h1>UserInModal</h1>;
                })}
            </section>
        </Modal>
    );
};

export default ReactionModal;
