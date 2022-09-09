import { Resolvers } from "@apollo/client";
import { User } from "@models";
import { UserStoreData, UserModel, MySettings } from "@types";
import { getFullName } from "@utils";
import { deleteCookie, setCookie } from "cookies-next";
import { createUserModel } from "@services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userResolvers: Resolvers = {
    Query: {
        initializeStore: async (_, __, context) => {
            if (!context.auth) return null;

            const user: UserModel | null = await User.findById(context.auth);
            if (!user) {
                deleteCookie("server-key", { req: context.req, res: context.res });
                throw new Error("Logged in user does not exist!");
            }

            const response: UserStoreData = {
                user_id: user._id,
                full_name: getFullName(user),
                profile_picture: user.profile_picture,
                theme: user.preferences.theme,
                color: user.preferences.color,
            };
            return response;
        },
        getMySettings: async (_, __, context) => {
            if (!context.auth) throw new Error("Your session has expired!");

            const user: UserModel | null = await User.findById(context.auth);
            if (!user) {
                deleteCookie("server-key", { req: context.req, res: context.res });
                throw new Error("Logged in user does not exist!");
            }

            const privacy = user.preferences.visibility;

            const response: MySettings = {
                username: user.username,
                password: "",
                first_name: user.first_name,
                last_name: user.last_name,
                theme: user.preferences.theme,
                color: user.preferences.color,
                friend_visibility: privacy.friends,
                group_visibility: privacy.groups,
                event_visibility: privacy.events,
                post_visibility: privacy.posts,
            };
            return response;
        },
    },
    Mutation: {
        registerUser: async (_, args) => {
            const model = await createUserModel(args);
            try {
                await User.create(model);
                return { message: `Successfully created user ${model.username}` };
            } catch (error) {
                throw new Error("An unexpected error has occurred");
            }
        },
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
