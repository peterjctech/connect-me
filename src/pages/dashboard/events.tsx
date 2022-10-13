import { DashboardLayout } from "layouts";
import { useSelector } from "react-redux";
import { StoreInterface, EventSummary } from "types";
import { GET_USER_EVENTS } from "@queries";
import { useQuery } from "@apollo/client";
import { EventCard, Loading } from "components";

const DashboardEvents = () => {
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { loading, data } = useQuery(GET_USER_EVENTS, {
        variables: { userId: userStore.user_id, isFriend: false, privacy: "Everyone" },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="list-container lg theme box">
            <h1>{userStore.full_name}'s Events</h1>
            <section>
                {data.getUserEvents.map((event: EventSummary) => {
                    return <EventCard key={event.event_id} event={event} />;
                })}
            </section>
        </div>
    );
};

DashboardEvents.PageLayout = DashboardLayout;

export default DashboardEvents;
