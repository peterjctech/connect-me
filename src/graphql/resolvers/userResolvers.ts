import { Resolvers } from "@apollo/client";
import { deleteCookie, setCookie } from "cookies-next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validateUpdateSettings, validateUserRegistration } from "@validators";
import { User } from "@models";
import { UserStoreData, UserModel, LoginUserProps, RegisterUserProps, UpdateUserSettingsProps } from "@types";
import { Types } from "mongoose";

const userResolvers: Resolvers = {
    Query: {
        initializeStore: async (_, __, context) => {
            if (!context.auth) return null;

            const user = await User.findById(context.auth)
                .select([
                    "first_name",
                    "last_name",
                    "friends.user",
                    "join_timestamp",
                    "profile_picture",
                    "settings.theme",
                    "settings.color",
                ])
                .then((data) => {
                    const { full_name, join_date, profile_picture } = data;
                    const { theme, color } = data.settings;

                    const response: UserStoreData = {
                        user_id: data._id.toString(),
                        full_name,
                        profile_picture,
                        join_date,
                        theme,
                        color,
                        friend_count: data.friends.length,
                    };
                    return response;
                });

            if (!user) {
                deleteCookie("server-key", { req: context.req, res: context.res });
                throw new Error("Logged in user does not exist!");
            }
            return user;
        },
        getMySettings: async (_, __, context) => {
            if (!context.auth) throw new Error("Your session has expired!");
            const user = await User.findById(context.auth).select(["username", "first_name", "last_name", "settings"]);
            const { username, first_name, last_name, settings } = user;
            const privacy = settings.visibility;
            const response: UpdateUserSettingsProps = {
                username,
                first_name,
                last_name,
                theme: settings.theme,
                color: settings.color,
                friend_visibility: privacy.friends,
                group_visibility: privacy.groups,
                post_visibility: privacy.posts,
                event_visibility: privacy.events,
                new_password: "",
                confirm_new_password: "",
                old_password: "",
            };

            return response;
        },
        getUserData: async (_, args, context) => {
            // const me = await User.findById(context.auth).select("friends.user");
            // const them = await User.findById("63236fcde8a02f47b7fb1146").select("friends.user");
            // const myFriends = me.friends.map((obj: any) => obj.user);
            // const theirFriends = them.friends.map((obj: any) => obj.user);

            const test = await User.aggregate([
                //
                { $match: { _id: new Types.ObjectId("63236fcde8a02f47b7fb1146") } },
                { $unwind: "$friends" },
            ]);
            console.log(test[0]);

            return null;
        },
        getFriends: async (_, args, context) => {
            const user = await User.findById(args.userId);

            console.log(user);

            return [];
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
                return { message: "Settings have been updated" };
            } catch (error) {
                throw new Error("Failed to update user settings");
            }
        },
    },
};

export default userResolvers;
