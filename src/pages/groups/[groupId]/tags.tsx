import { useState, useContext, useEffect } from "react";
import { GroupLayout, GroupContext } from "layouts";
import { TagSummary } from "types";
import { GET_GROUP_TAGS } from "@queries";
import { client } from "utils";
import { TagCard, Loading } from "components";

const GroupTagsPage = () => {
    const [data, setData] = useState<null | TagSummary[]>(null);
    const context = useContext(GroupContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_GROUP_TAGS,
                    variables: {
                        groupId: context.group_id,
                    },
                });
                setData(response.data.getGroupTags);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <div className="list-container theme box">
            <h1>Tags</h1>
            <section>
                {data.map((tag: TagSummary) => {
                    return <TagCard key={tag.tag_id} tag={tag} />;
                })}
            </section>
        </div>
    );
};

GroupTagsPage.PageLayout = GroupLayout;

export default GroupTagsPage;
