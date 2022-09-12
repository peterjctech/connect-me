import { Types } from "mongoose";
import { FaThumbsUp } from "react-icons/fa";

interface CommentProps {
    author: {
        id: Types.ObjectId;
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
                    <p>{createdAt.relative}</p>
                    <p>&#x2022;</p>
                    <p>
                        {<FaThumbsUp />}
                        {likes.count}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Comment;
