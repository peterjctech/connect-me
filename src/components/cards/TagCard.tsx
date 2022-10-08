import { TagSummary } from "types";

interface TagCardProps {
    tag: TagSummary;
}

const TagCard = ({ tag }: TagCardProps) => {
    return (
        <div>
            <h1>TagCard</h1>
        </div>
    );
};

export default TagCard;
