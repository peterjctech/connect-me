import { EXPLORE_USERS } from "@queries";
import { Loading, UserCard } from "components";
import { useState, useEffect } from "react";
import { UserSummary } from "types";
import { client } from "utils";

const UsersPage = () => {
    const [skipNumber, setSkipNumber] = useState(0);
    const [data, setData] = useState<null | UserSummary[]>(null);

    const getData = async () => {
        try {
            const response = await client.query({ query: EXPLORE_USERS, variables: { skipNumber } });
            setData(response.data.exploreUsers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <main>
            <div className="list-container theme box">
                <h1>Explore Users</h1>
                <section>
                    {data.map((user: UserSummary) => {
                        return <UserCard key={user.user_id} user={user} />;
                    })}
                </section>
            </div>
        </main>
    );
};

export default UsersPage;
