import { EXPLORE_EVENTS } from "@queries";
import { Loading, EventCard } from "components";
import { useState, useEffect } from "react";
import { EventSummary } from "types";
import { client } from "utils";

const EventsPage = () => {
    const [skipNumber, setSkipNumber] = useState(0);
    const [data, setData] = useState<null | EventSummary[]>(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.query({ query: EXPLORE_EVENTS, variables: { skipNumber } });
                setData(response.data.exploreEvents);
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
                <h1>Explore Events</h1>
                <section>
                    {data.map((event: EventSummary) => {
                        return <EventCard key={event.event_id} event={event} />;
                    })}
                </section>
            </div>
        </main>
    );
};

export default EventsPage;
