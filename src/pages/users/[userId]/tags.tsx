import { useState, useContext, useEffect } from "react";
import { UserLayout, UserContext } from "layouts";
import { TagSummary } from "types";
import { GET_USER_TAGS } from "@queries";
import { client } from "utils";
import { TagCard, Loading } from "components";

const UserUserIdTags = () => {
    const [data, setData] = useState<null | TagSummary[]>(null);
    const context = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_USER_TAGS,
                    variables: {
                        userId: context.user_id,
                    },
                });
                setData(response.data.getUserTags);
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
        <div className="list-container theme box">
            <h1>{context.full_name}&apos;s Tags</h1>
            <section>
                {data.map((tag: TagSummary) => {
                    return <TagCard key={tag.tag_id} tag={tag} />;
                })}
            </section>
        </div>
    );
};

UserUserIdTags.PageLayout = UserLayout;

export default UserUserIdTags;
