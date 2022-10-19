import { useState, useEffect, useContext } from "react";
import { GET_TAG_USERS } from "@queries";
import { TagLayout, TagContext } from "layouts";
import { UserSummary } from "types";
import { Loading, UserCard } from "components";
import { client } from "utils";

const TagUsersPage = () => {
    const [data, setData] = useState<null | UserSummary[]>(null);
    const context = useContext(TagContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_TAG_USERS,
                    variables: {
                        tagId: context.tag_id,
                    },
                });
                setData(response.data.getTagUsers);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <div className="list-container theme box">
            <h1>Users</h1>
            <section>
                {data.map((user: UserSummary) => {
                    return <UserCard key={user.user_id} user={user} />;
                })}
            </section>
        </div>
    );
};

TagUsersPage.PageLayout = TagLayout;

export default TagUsersPage;
