import { Reaction, CommentData } from "@types";
import { Comment } from "@common";
import { FaThumbsUp, FaSurprise, FaSadCry } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { BsFillHandThumbsUpFill, BsFillEmojiAngryFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

interface OutlineProps {
    image: string;
    heading: string;
    datetime: {
        absolute: string;
        relative: string;
    };
    children: React.ReactNode;
    canEdit?: boolean;
    reactions?: {
        all: {
            type: Reaction;
            list: string[];
        }[];
        count: number;
        display: string;
    };
    comments?: {
        all: CommentData[];
        count: number;
    };
}

const Outline = ({ image, heading, datetime, children, reactions, comments, canEdit }: OutlineProps) => {
    const htmlEmojis = {
        Like: <span key="Like">&#128077;</span>,
        Love: <span key="Love">&#10084;&#65039;</span>,
        Angry: <span key="Angry">&#x1F621;</span>,
        Wow: <span key="Wow">&#128562;</span>,
        Sad: <span key="Sad">&#128546;</span>,
    };

    return (
        <div className="outline container">
            <header>
                <img src={image} className="pfp--md" />
                <h6>{heading}</h6>
                <p>{datetime.relative}</p>
                {canEdit && <HiPencil />}
            </header>
            <hr />
            <section>{children}</section>
            <hr />
            {reactions && (
                <>
                    <footer>
                        {reactions.all.map((reaction) => htmlEmojis[reaction.type])}
                        <span className="outline__r-display">{reactions.display}</span>
                        <span className="outline__r-count">{reactions.count}</span>
                        <div className="outline__like">React {<FaThumbsUp />}</div>
                    </footer>
                    <hr />
                </>
            )}
            {comments && (
                <aside className="outline__comments">
                    {comments.count > 3 && <div className="outline__expand">See all {comments.count} comments</div>}
                    {comments.all.map((obj, index) => {
                        return (
                            <Comment
                                author={{
                                    id: obj.user_id,
                                    name: obj.full_name,
                                    picture: obj.profile_picture,
                                }}
                                likes={{ count: obj.like_count, list: obj.like_list }}
                                createdAt={obj.created_at}
                                key={index}
                            >
                                {obj.content}
                            </Comment>
                        );
                    })}
                </aside>
            )}
        </div>
    );
};

export default Outline;
