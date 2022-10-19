import { useState, useEffect, useContext } from "react";
import { GET_GROUP_MEMBERS } from "@queries";
import { GroupLayout, GroupContext } from "layouts";
import { UserSummary } from "types";
import { Loading, UserCard } from "components";
import { client } from "utils";

const GroupMembersPage = () => {
    const [data, setData] = useState<any>(null);
    const context = useContext(GroupContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_GROUP_MEMBERS,
                    variables: {
                        groupId: context.group_id,
                    },
                });
                setData(response.data.getGroupMembers);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <div className="list-container theme box">
            <h1>Admins</h1>
            <section>
                {data.admins.map((user: UserSummary) => {
                    return <UserCard key={user.user_id} user={user} />;
                })}
            </section>
            <h1>Members</h1>
            <section>
                {data.members.map((user: UserSummary) => {
                    return <UserCard key={user.user_id} user={user} />;
                })}
            </section>
        </div>
    );
};

GroupMembersPage.PageLayout = GroupLayout;

export default GroupMembersPage;
