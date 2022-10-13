import { EXPLORE_TAGS } from "@queries";
import { Loading, TagCard } from "components";
import { useState, useEffect } from "react";
import { TagSummary } from "types";
import { client } from "utils";

const TagsPage = () => {
    const [skipNumber, setSkipNumber] = useState(0);
    const [data, setData] = useState<null | TagSummary[]>(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({ query: EXPLORE_TAGS, variables: { skipNumber } });
                setData(response.data.exploreTags);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <main>
            <div className="list-container theme box">
                <h1>Explore Tags</h1>
                <section>
                    {data.map((tag: TagSummary) => {
                        return <TagCard key={tag.tag_id} tag={tag} />;
                    })}
                </section>
            </div>
        </main>
    );
};

export default TagsPage;
