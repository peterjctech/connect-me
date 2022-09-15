import { HiPencil } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";

import { Tooltip } from "@common";
import { ReactionSummary, TagSummary, ReactionDisplay, CommentData } from "@types";
import { Tag, Comment } from "@components";
import { htmlEmojis } from "@helpers";

interface OutlineProps {
    image: string;
    heading: string;
    datetime: {
        main: string;
        hover: string;
    };
    canEdit?: boolean;
    isEdited: boolean;
    children: React.ReactNode;
    tags: TagSummary[];
    reactions?: {
        summary: ReactionSummary[];
        display: ReactionDisplay;
    };
    comments?: {
        list: CommentData[];
        count: number;
    };
}

const Outline = ({
    image,
    heading,
    datetime,
    isEdited,
    canEdit,
    reactions,
    tags,
    comments,
    children,
}: OutlineProps) => {
    return (
        <div className="outline container">
            <header>
                <img src={image} className="pfp--md" />
                <h6>{heading}</h6>
                <span>
                    <Tooltip hover={datetime.hover}>{datetime.main}</Tooltip>
                    {isEdited && (
                        <p className="outline__edited">
                            <BsDot />
                            edited
                        </p>
                    )}
                </span>
                {canEdit && <HiPencil />}
            </header>
            <hr />
            <section>{children}</section>
            <hr />
            {tags.length > 0 && (
                <>
                    <aside>
                        {tags.map((tag) => {
                            return <Tag tag={tag} />;
                        })}
                    </aside>
                    <hr />
                </>
            )}
            {reactions && (
                <>
                    <summary>
                        {reactions.summary.map((obj) => {
                            return (
                                <Tooltip hover={obj.list} key={obj.type}>
                                    {htmlEmojis[obj.type]}
                                </Tooltip>
                            );
                        })}
                        <span className="outline__react--extended">{reactions.display.extended}</span>
                        <span className="outline__react--standard">{reactions.display.standard}</span>
                        <div className="outline__like">React {<FaThumbsUp />}</div>
                    </summary>
                    <hr />
                </>
            )}
            {comments && comments.count > 0 && (
                <footer>
                    {comments.count > 3 && (
                        <div className="outline__expand link">See all {comments.count} comments</div>
                    )}
                    {comments.list.map((obj) => {
                        return (
                            <Comment
                                author={{
                                    id: obj.user_id,
                                    name: obj.full_name,
                                    picture: obj.profile_picture,
                                }}
                                likes={obj.likes}
                                createdAt={obj.created_at}
                                key={obj.comment_id}
                            >
                                {obj.content}
                            </Comment>
                        );
                    })}
                </footer>
            )}
        </div>
    );
};

export default Outline;
