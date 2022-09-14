import { TagSummary } from "@types";
import { useRouter } from "next/router";

interface TagProps {
    tag: TagSummary;
}

const Tag = ({ tag }: TagProps) => {
    const router = useRouter();

    return (
        <p onClick={() => router.push(`/tags/${tag.tag_id}`)} className="tag">
            #{tag.name}
        </p>
    );
};

export default Tag;
