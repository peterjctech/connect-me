import { EventSummary, PopulatedEventModel } from "@types";
import { formatTimestamp, getFullName, getReactionList } from "@utils";
import { Types } from "mongoose";

export const getEventSummary = (event: PopulatedEventModel, myId: Types.ObjectId | null) => {
    const meInEvent = myId ? event.users.find((obj) => obj.user === myId) : null;
    if (!meInEvent && event.group.join_restriction !== "Open")
        throw new Error("You are not authorized to view this event");

    const response: EventSummary = {
        id: event._id,
        name: event.name,
        my_status: meInEvent ? meInEvent.status : "None",
        creator_id: event.creator._id,
        creator_name: getFullName(event.creator),
        group_id: event.group._id,
        group_name: event.group.name,
        description: event.description,
        confirmed_count: event.users.map((obj) => obj.status === "Yes").length,
        maybe_count: event.users.map((obj) => obj.status === "Maybe").length,
        reaction_list: getReactionList(event.reactions),
        reaction_count: event.reactions.length,
        comment_count: event.comments.length,
        starts_at: formatTimestamp(event.start_timestamp, "datetime"),
        ends_at: event.end_timestamp ? formatTimestamp(event.end_timestamp, "datetime") : undefined,
    };
    return response;
};
