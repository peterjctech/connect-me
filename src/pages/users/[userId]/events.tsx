import { useState, useContext, useEffect } from "react";
import { UserLayout, UserContext } from "layouts";
import { EventSummary } from "types";
import { GET_USER_EVENTS } from "@queries";
import { client } from "utils";
import { EventCard, Loading } from "components";

const UserUserIdEvents = () => {
    const [data, setData] = useState<null | EventSummary[]>(null);
    const context = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_USER_EVENTS,
                    variables: {
                        userId: context.user_id,
                        isFriend: context.friendship_status === "Accepted",
                        privacy: context.group_privacy,
                    },
                });
                setData(response.data.getUserEvents);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <div className="list-container lg theme box">
            <h1>{context.full_name}&apos;s Events</h1>
            <section>
                {data.map((event: EventSummary) => {
                    return <EventCard key={event.event_id} event={event} />;
                })}
            </section>
        </div>
    );
};

UserUserIdEvents.PageLayout = UserLayout;

export default UserUserIdEvents;
