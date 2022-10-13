import { EXPLORE_GROUPS } from "@queries";
import { Loading, GroupCard } from "components";
import { useState, useEffect } from "react";
import { GroupSummary } from "types";
import { client } from "utils";

const GroupsPage = () => {
    const [skipNumber, setSkipNumber] = useState(0);
    const [data, setData] = useState<null | GroupSummary[]>(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({ query: EXPLORE_GROUPS, variables: { skipNumber } });
                setData(response.data.exploreGroups);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <main>
            <div className="list-container lg theme box">
                <h1>Explore Groups</h1>
                <section>
                    {data.map((group: GroupSummary) => {
                        return <GroupCard key={group.group_id} group={group} />;
                    })}
                </section>
            </div>
        </main>
    );
};

export default GroupsPage;
