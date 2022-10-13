import { Button } from "common";
import { TagSummary } from "types";
import { useRouter } from "next/router";
import { tagAction } from "helpers";

interface TagCardProps {
    tag: TagSummary;
}

const TagCard = ({ tag }: TagCardProps) => {
    const router = useRouter();
    const action = tagAction(tag);
    return (
        <div className="tag-card">
            <div onClick={() => router.push(`/tags/${tag.tag_id}`)} className={`tag-card__color ${tag.color}`} />
            <h6>{tag.name}</h6>
            <Button click={() => action.action({ tagId: tag.tag_id })} type={action.button}>
                {action.text}
            </Button>
        </div>
    );
};

export default TagCard;
