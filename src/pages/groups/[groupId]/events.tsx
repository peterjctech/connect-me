import { useState, useContext, useEffect } from "react";
import { GroupLayout, GroupContext } from "layouts";
import { EventSummary } from "types";
import { GET_GROUP_EVENTS } from "@queries";
import { client } from "utils";
import { EventCard, Loading } from "components";

const GroupEventsPage = () => {
    const [data, setData] = useState<null | EventSummary[]>(null);
    const context = useContext(GroupContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({
                    query: GET_GROUP_EVENTS,
                    variables: {
                        groupId: context.group_id,
                        isMember: context.is_member,
                    },
                });
                setData(response.data.getGroupEvents);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    if (!data) return <Loading />;

    return (
        <div className="list-container lg theme box">
            <h1>Events</h1>
            <section>
                {data.map((event: EventSummary) => {
                    return <EventCard key={event.event_id} event={event} />;
                })}
            </section>
        </div>
    );
};

GroupEventsPage.PageLayout = GroupLayout;

export default GroupEventsPage;
