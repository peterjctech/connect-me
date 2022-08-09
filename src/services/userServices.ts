import { User } from "@models";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { EventModel, ChatModel, PostModel, UserModel, UserStore, Notification, ChatNotif, UserProps } from "@types";
import { formatTimestamp } from "@utils";

interface Friend {
    _id: UserModel;
    timestamp: number;
}

interface Message {
    _id: ChatModel;
    timestamp: number;
}

const getPosts = (arr: PostModel[]) => {
    const posts = arr.map((obj) => {
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
    });

    return posts;
};

const getFriends = (arr: Friend[]) => {
    const friends = arr.map((obj) => {
        const friend = obj._id;

        return {
            _id: friend._id,
            full_name: `${friend.first_name} ${friend.last_name}`,
            profile_picture: friend.profile_picture,
            friendship_date: formatTimestamp(obj.timestamp, "date"),
            timestamp: obj.timestamp,
        };
    });

    return friends;
};

export const createUserModel = async ({ firstName, lastName, username, password, confirmPassword }: UserProps) => {
    if (!firstName) throw new Error("First name cannot be empty");
    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (username.length < 6 || username.length > 20) throw new Error("Username must be between 6 and 20 characters");
    if (password.length < 6 || password.length > 20) throw new Error("Password must be between 6 and 20 characters");
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const user = await User.findOne({ username });
    if (user) throw new Error("Username already exists");

    return {
        first_name: firstName,
        last_name: lastName,
        username,
        password: bcrypt.hashSync(password, 10),
        join_date: dayjs().unix(),
    };
};

export const parseUserData = async (id: string) => {
    const user = await User.findById(id).populate("friends._id").populate("groups").populate("posts").populate("tags");

    const response = {
        _id: user._id,
        full_name: `${user.first_name} ${user.last_name}`,
        profile_picture: user.profile_picture,
        join_date: formatTimestamp(user.join_timestamp, "date"),
        friends: getFriends(user.friends),
        groups: user.groups,
        posts: getPosts(user.posts),
        tags: user.tags,
        friend_count: user.friends.length,
    };

    return response;
};

export const parseMe = async (id: string) => {
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
        friends: getFriends(user.friends),
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
        posts: getPosts(user.posts),
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
                id: obj.id,
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
                id: obj.id,
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
