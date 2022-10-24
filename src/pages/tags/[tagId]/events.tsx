import { useState, useContext, useEffect } from "react";
import { TagLayout, TagContext } from "layouts";
import { EventSummary } from "types";
import { GET_TAG_EVENTS } from "@queries";
import { client } from "utils";
import { EventCard, Loading } from "components";

const TagEventsPage = () => {
    const [data, setData] = useState<null | EventSummary[]>(null);
    const context = useContext(TagContext);

    const getData = async () => {
        try {
            const response = await client.query({
                query: GET_TAG_EVENTS,
                variables: {
                    tagId: context.tag_id,
                },
            });
            setData(response.data.getTagEvents);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
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

TagEventsPage.PageLayout = TagLayout;

export default TagEventsPage;
