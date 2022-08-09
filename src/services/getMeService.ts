import { User } from "@models";
import { formatTimestamp } from "@utils";
import { UserModel, ChatModel, PostModel, EventModel, UserStore } from "@types";

interface Friend {
    _id: UserModel;
    timestamp: number;
}
interface Message {
    _id: ChatModel;
    timestamp: number;
}

interface Notification {
    _id: string;
    title: string;
    message: string;
    ref_id: string;
    ref_model: string;
    timestamp: number;
    is_read: boolean;
}

interface ChatNotif {
    _id: string;
    message: string;
    timestamp: number;
}

export const getMeService = async (id: string) => {
    const user = await User.findById(id)
        .populate("friends._id")
        .populate("messages._id")
        .populate("groups")
        .populate("posts")
        .populate("tags")
        .populate("events");

    const response: UserStore = {
        _id: user._id,
        full_name: `${user.first_name} ${user.last_name}`,
        profile_picture: user.profile_picture,
        join_date: formatTimestamp(user.join_timestamp, "date"),
        friends: user.friends.map((obj: Friend) => {
            const friend = obj._id;

            return {
                _id: friend._id,
                full_name: `${friend.first_name} ${friend.last_name}`,
                profile_picture: friend.profile_picture,
                friendship_date: formatTimestamp(obj.timestamp, "date"),
                timestamp: obj.timestamp,
            };
        }),
        messages: user.messages.map((obj: Message) => {
            const message = obj._id;

            return {
                _id: message._id,
                title: message.title,
                last_checked: formatTimestamp(obj.timestamp, "datetime"),
                timestamp: obj.timestamp,
            };
        }),
        groups: user.groups,
        posts: user.posts.map((obj: PostModel) => {
            return {
                _id: obj._id,
                author: obj.author,
                content: obj.content,
                ref_id: obj.ref_id,
                ref_model: obj.ref_model,
                reaction_count: obj.reactions.length,
                comment_count: obj.comments.length,
                created_at: formatTimestamp(obj.created_at, "fulldate"),
                updated_at: obj.updated_at ? formatTimestamp(obj.updated_at, "fulldate") : "",
                timestamp: obj.updated_at || obj.created_at,
            };
        }),
        tags: user.tags,
        events: user.events.map((obj: EventModel) => {
            return {
                _id: obj._id,
                event: obj.event,
                group_id: obj.group,
                description: obj.description,
                starts_at: formatTimestamp(obj.starts_at, "time"),
                ends_at: obj.ends_at ? formatTimestamp(obj.ends_at, "time") : "",
                timestamp: obj.starts_at,
            };
        }),
        notifications: user.notifications.map((obj: Notification) => {
            return {
                title: obj.title,
                message: obj.message,
                ref_id: obj.ref_id,
                ref_model: obj.ref_model,
                timestamp: obj.timestamp,
                is_read: obj.is_read,
                datetime: formatTimestamp(obj.timestamp, "datetime"),
            };
        }),
        chat_notifs: user.chat_notifs.map((obj: ChatNotif) => {
            return {
                _id: obj._id,
                message: obj.message,
                timestamp: obj.timestamp,
                datetime: formatTimestamp(obj.timestamp, "datetime"),
            };
        }),
        friend_count: user.friends.length,
        is_initialized: true,
    };

    return response;
};
