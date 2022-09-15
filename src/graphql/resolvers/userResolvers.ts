import { Resolvers } from "@apollo/client";
import { User } from "@models";
import { UserStoreData, UserModel, LoginUserProps, RegisterUserProps, UpdateUserSettingsProps } from "@types";
import { getFullName, formatTimestamp } from "@utils";
import { deleteCookie, setCookie } from "cookies-next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { getSettings, getUserData } from "@services";
import { validateUpdateSettings, validateUserRegistration } from "@validators";

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
                user_id: user._id.toString(),
                full_name: getFullName(user),
                friend_count: user.friends.length,
                join_date: formatTimestamp(user.join_timestamp, "date"),
                profile_picture: user.profile_picture,
                theme: user.preferences.theme,
                color: user.preferences.color,
            };
            return response;
        },
        getMySettings: async (_, __, context) => {
            if (!context.auth) throw new Error("Your session has expired!");
            const response = await getSettings(context.auth, context.req, context.res);
            return response;
        },
        getUserData: async (_, args, context) => {
            const user = await User.findById(args.userId)
                .populate({
                    path: "friends.user",
                    select: ["first_name", "last_name"],
                })
                .select(["friends", "first_name", "last_name", "profile_picture", "join_timestamp"])
                .lean();
            if (!user) throw new Error("User doesn't exist!");
            const me = await User.findById(context.auth).select("friends.user");
            if (!me) throw new Error("Your session has expired!");

            const myFriends = me.friends.map((obj: { user: Types.ObjectId }) => obj.user.toString());
            const response = getUserData(user, { id: context.auth, friends: myFriends });
            return response;
        },
        getFriends: async (_, args, context) => {
            const me = await User.findById(context.auth).select(["friends"]);
            const user = await User.findById(args.id).populate("friends.user");
        },
    },
    Mutation: {
        registerUser: async (_, args: RegisterUserProps) => {
            const model = await validateUserRegistration(args);
            try {
                await User.create(model);
                return { message: `Successfully created user ${model.username}` };
            } catch (error) {
                throw new Error("An unexpected error has occurred");
            }
        },
        loginUser: async (_, args: LoginUserProps, { req, res }) => {
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
        updateUserSettings: async (_, args: UpdateUserSettingsProps, context) => {
            if (!context.auth) throw new Error("Your session has expired");
            const user = await User.findById(context.auth);
            if (!user) throw new Error("Your session has expired!");
            const newSettings = await validateUpdateSettings(args, user);

            try {
                await User.findByIdAndUpdate(context.auth, newSettings);
                const response = await getSettings(context.auth, context.req, context.res);
                return response;
            } catch (error) {
                throw new Error("Failed to update user settings");
            }
        },
    },
};

export default userResolvers;
