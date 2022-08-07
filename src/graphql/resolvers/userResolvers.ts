import { Resolvers } from "@apollo/client";
import jwt from "jsonwebtoken";
import { deleteCookie, setCookie } from "cookies-next";
import { User } from "@models";
import { ChatModel, PostModel, UserModel } from "@types";
import { createUserProps, loginUser } from "@services";
import { formatTimestamp } from "@utils";

interface Friend {
    _id: UserModel;
    friendship_date: number;
}

interface Message {
    _id: ChatModel;
    last_checked: number;
}

interface UserPost {
    _doc: PostModel;
}

const userResolvers: Resolvers = {
    Query: {
        async getMe(_, __, context) {
            if (!context.auth) return null;
            const user = await User.findOne({ _id: context.auth })
                .populate("friends._id")
                .populate("messages._id")
                .populate("groups")
                .populate("posts")
                .populate("tags")
                .populate("events");

            const data = {
                ...user._doc,
                full_name: `${user.first_name} ${user.last_name}`,
                join_date: formatTimestamp(user.join_date, "fulldate"),
                friends: user.friends.map((obj: Friend) => {
                    return {
                        _id: obj._id._id,
                        full_name: `${obj._id.first_name} ${obj._id.last_name}`,
                        profile_picture: obj._id.profile_picture,
                        friendship_date: formatTimestamp(user.join_date, "date"),
                    };
                }),
                messages: user.messages.map((obj: Message) => {
                    return {
                        _id: obj._id._id,
                        title: obj._id.title,
                        last_checked: formatTimestamp(obj.last_checked, "fulldate"),
                    };
                }),
                posts: user.posts.map((obj: UserPost) => {
                    return {
                        ...obj._doc,
                        reaction_count: obj._doc.reactions.length,
                        comment_count: obj._doc.comments.length,
                    };
                }),
                friend_count: user.friends.length,
            };

            return data;
        },
    },
    Mutation: {
        async createUser(_, args) {
            const props = await createUserProps(args);
            await User.create(props);
            return { message: `Successfully created user ${props.username}` };
        },
        async loginUser(_, args, { req, res }) {
            const user = await loginUser(args);
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
                    expiresIn: 60 * 60 * 24,
                });
                setCookie("server-key", token, { req, res, maxAge: 60 * 60 * 24 });
                return { message: `Logged in as ${user.username}` };
            } else {
                throw new Error("Invalid credentials");
            }
        },
        async logoutUser(_, __, { req, res }) {
            deleteCookie("server-key", { req, res });
            return { message: "Successfully logged out!" };
        },
    },
};

export default userResolvers;
