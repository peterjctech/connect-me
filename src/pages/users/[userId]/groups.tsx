import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { GET_USER_GROUPS } from "@queries";
import { UserLayout, UserContext } from "layouts";
import { StoreInterface, GroupSummary } from "types";
import { Loading, GroupCard } from "components";
import { client } from "utils";

const UsersUserIdGroups = () => {
    const [data, setData] = useState<null | GroupSummary[]>(null);
    const context = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_USER_GROUPS,
                    variables: {
                        userId: context.user_id,
                        isFriend: context.friendship_status === "Accepted",
                        privacy: context.group_privacy,
                    },
                });
                console.log(response);
                setData(response.data.getUserGroups);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) {
        return <Loading />;
    }

    return (
        <div className="list-container lg theme box">
            <h1>{context.full_name}'s Groups</h1>
            <section>
                {data.map((group: GroupSummary) => {
                    return <GroupCard key={group.group_id} group={group} />;
                })}
            </section>
        </div>
    );
};

UsersUserIdGroups.PageLayout = UserLayout;

export default UsersUserIdGroups;
