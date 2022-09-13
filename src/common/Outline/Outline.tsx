import { FaThumbsUp } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";

import { Comment } from "@components";
import { Reaction, CommentData } from "@types";

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
        display: {
            standard: number;
            extended: string;
        };
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
        Angry: <span key="Angry">&#128122;</span>,
        Wow: <span key="Wow">&#128562;</span>,
        Sad: <span key="Sad">&#128546;</span>,
        Haha: <span key="Sad">&#128514;</span>,
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
                        <span className="outline__r-display">{reactions.display.extended}</span>
                        <span className="outline__r-count">{reactions.display.standard}</span>
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
                                likes={obj.likes}
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
