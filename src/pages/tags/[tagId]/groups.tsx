import { useState, useEffect, useContext } from "react";
import { GET_TAG_GROUPS } from "@queries";
import { TagLayout, TagContext } from "layouts";
import { GroupSummary } from "types";
import { Loading, GroupCard } from "components";
import { client } from "utils";

const TagGroups = () => {
    const [data, setData] = useState<null | GroupSummary[]>(null);
    const context = useContext(TagContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_TAG_GROUPS,
                    variables: {
                        tagId: context.tag_id,
                    },
                });
                setData(response.data.getTagGroups);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, [context]);

    if (!data) return <Loading />;

    return (
        <div className="list-container lg theme box">
            <h1>Groups</h1>
            <section>
                {data.map((group: GroupSummary) => {
                    return <GroupCard key={group.group_id} group={group} />;
                })}
            </section>
        </div>
    );
};

TagGroups.PageLayout = TagLayout;

export default TagGroups;
