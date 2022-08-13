import { Resolvers } from "@apollo/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookie, deleteCookie } from "cookies-next";
import { UserModel, UserStoreData } from "@types";
import { User } from "@models";
import { getFullName } from "@utils";

const userResolvers: Resolvers = {
    Query: {
        initializeStore: async (_, __, context) => {
            if (!context.auth) return null;
            const user = await User.findById(context.auth);
            if (!user) {
                deleteCookie("server-key", { req: context.req, res: context.res });
                throw new Error("Logged in user does not exist!");
            }

            const response: UserStoreData = {
                id: user._id,
                full_name: getFullName(user),
                profile_picture: user.profile_picture,
                theme: user.preferences.theme,
            };
            return response;
        },
    },
    Mutation: {
        loginUser: async (_, args, { req, res }) => {
            const user: UserModel | null = await User.findOne({ username: args.username });
            if (!user) throw new Error("Invalid credentials");

            const compareHash = bcrypt.compareSync(args.password, user.password);
            if (!compareHash) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
                expiresIn: 60 * 60 * 24,
            });
            setCookie("server-key", token, { req, res, maxAge: 60 * 60 * 24 });

            return { message: `Logged in as ${user.username}` };
        },
        logoutUser: async (_, __, { req, res }) => {
            deleteCookie("server-key", { req, res });
            return { message: "Successfully logged out!" };
        },
    },
};

export default userResolvers;
