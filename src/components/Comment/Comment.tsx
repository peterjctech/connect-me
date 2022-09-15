import { Tooltip } from "@common";
import { FaThumbsUp } from "react-icons/fa";

interface CommentProps {
    author: {
        id: string;
        name: string;
        picture: string;
    };
    likes: {
        count: number;
        list: string[];
    };
    createdAt: {
        relative: string;
        absolute: string;
    };
    children: React.ReactNode;
}

const Comment = ({ author, likes, createdAt, children }: CommentProps) => {
    return (
        <div className="comment">
            <img src={author.picture} />
            <section>
                <h6>{author.name}</h6>
                <p>{children}</p>
                <div className="comment__footer">
                    <Tooltip hover={createdAt.absolute}>{createdAt.relative}</Tooltip>
                    <p>&#x2022;</p>
                    <Tooltip hover={likes.list}>
                        {<FaThumbsUp />} {likes.count}
                    </Tooltip>
                </div>
            </section>
        </div>
    );
};

export default Comment;
