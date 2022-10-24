import { BriefTagSummary } from "types";
import { useRouter } from "next/router";

interface TagProps {
    tag: BriefTagSummary;
}

const Tag = ({ tag }: TagProps) => {
    const router = useRouter();

    const route = () => {
        router.push(`/tags/${tag.tag_id}`);
    };

    return (
        <p onClick={route} className="tag">
            #{tag.name}
        </p>
    );
};

export default Tag;
