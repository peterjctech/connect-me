import { ConversationSummary, PopulatedConversationModel } from "@types";
import { formatTimestamp, getFullName } from "@utils";
import { Types } from "mongoose";

export const getConversationSummary = (convo: PopulatedConversationModel, myId: Types.ObjectId) => {
    const me = convo.members.find((obj) => obj.user === myId);
    if (!me) throw new Error("An unexpected error has occurred fetching your conversations");
    const mostRecentMessage = convo.messages.sort((a, b) => b.timestamp - a.timestamp)[0];

    const response: ConversationSummary = {
        id: convo._id,
        title: convo.title,
        most_recent_message: {
            profile_picture: mostRecentMessage.user.profile_picture,
            full_name: getFullName(mostRecentMessage.user),
            content: mostRecentMessage.content,
            datetime: formatTimestamp(mostRecentMessage.timestamp, "relative"),
        },
        is_read: me.last_read_timestamp > mostRecentMessage.timestamp ? true : false,
    };
    return response;
};
