import { Resolvers } from "@apollo/client";
import { User } from "@models";
import {
    UserStoreData,
    UserModel,
    LoginUserProps,
    RegisterUserProps,
    UpdateUserSettingsProps,
    UserData,
    UserSummary,
} from "@types";
import { getFullName, formatTimestamp, getMutualCount } from "@utils";
import { deleteCookie, setCookie } from "cookies-next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { testFunction } from "services/testService";

import { getSettings } from "@services";
import { validateUpdateSettings, validateUserRegistration } from "@validators";

const userResolvers: Resolvers = {
    Query: {
        test: async (_, __, context) => {
            await testFunction(context.auth);
            return { message: "Hello" };
        },
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
                profile_picture: user.profile_picture || "/profile-picture.jpg",
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
            console.log("here");
            const id = args.id || context.auth;
            if (!id) throw new Error("Your session has expired!");
            const user = await User.findById(id);
            if (!user) throw new Error("User doesn't exist!");

            const response: UserData = {
                user_id: user._id,
                full_name: getFullName(user),
                profile_picture: user.profile_picture,
                mutual_friend_count: 5,
                friendship_date: "someday",
                join_date: formatTimestamp(user.join_timestamp, "date"),
                friend_count: user.friends.length,
            };
            return response;
        },
        getUserFriends: async (_, args, context) => {
            interface Friend {
                user: Types.ObjectId;
                friendship_timestamp: number;
            }
            interface PopulatedFriend {
                user: UserModel;
                friendship_timestamp: number;
            }

            const me = await User.findById(context.auth).select(["friends"]);
            const user = await User.findById(args.id).populate("friends.user");

            const myFriends = me.friends.map((obj: Friend) => obj.user.toString());

            const response = user.friends
                .sort((a: PopulatedFriend, b: PopulatedFriend) => b.friendship_timestamp - a.friendship_timestamp)
                .map((friend: PopulatedFriend) => {
                    const userFriends = friend.user.friends.map((obj: Friend) => obj.user.toString());
                    const isMyFriend = me.friends.find((obj: Friend) => obj.user.equals(friend.user._id));
                    const date = isMyFriend ? formatTimestamp(isMyFriend.friendship_timestamp, "shortdate") : undefined;
                    const res: UserSummary = {
                        user_id: friend.user._id.toString(),
                        full_name: getFullName(friend.user),
                        profile_picture: friend.user.profile_picture,
                        mutual_friend_count: getMutualCount(userFriends, myFriends),
                        friendship_date: date,
                    };
                    return res;
                });
            return response;
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
