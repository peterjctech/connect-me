import { Resolvers } from "@apollo/client";
import jwt from "jsonwebtoken";
import { deleteCookie, setCookie } from "cookies-next";
import { User } from "@models";
import { createUserProps, loginUser } from "@services";

const userResolvers: Resolvers = {
    Query: {
        async getMe(_, __, context) {
            if (!context.auth) return null;
            const user = await User.findOne({ username: context.auth });

            const data = {
                ...user._doc,
                friend_count: user.friends.length,
                full_name: `${user.first_name} ${user.last_name}`,
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
                const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET!, {
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
