import { Card } from "common";
import { useRouter } from "next/router";
import { EventSummary } from "types";

interface EventCardProps {
    event: EventSummary;
}

const EventCard = ({ event }: EventCardProps) => {
    const router = useRouter();
    const handleClick = () => {
        if (event.group_id) router.push(`/groups/${event.group_id}`);
        if (event.user_id) router.push(`/users/${event.user_id}`);
    };
    return (
        <Card title={event.name} link={`/events/${event.event_id}`} image={event.picture}>
            <h6 onClick={handleClick} className="link">
                {event.user_id ? "User: " : "Group: "}
                {event.reference_name}
            </h6>
            <p>{event.datetime}</p>
            <p>
                {event.confirmed_count.total} going ({event.confirmed_count.friends} friends)
            </p>
            {event.my_status && <p>My Status: {event.my_status}</p>}
        </Card>
    );
};

export default EventCard;
