import { Resolvers } from "@apollo/client";
import { User } from "@models";
import {
    UserStoreData,
    UserModel,
    LoginUserProps,
    RegisterUserProps,
    UpdateUserSettingsProps,
    ProfileData,
    PostBase,
    PostSummary,
} from "@types";
import { getFullName, formatTimestamp } from "@utils";
import { deleteCookie, setCookie } from "cookies-next";
import { getSettings, getPostSummary } from "@services";
import { validateUpdateSettings, validateUserRegistration } from "@validators";
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
        getProfileData: async (_, args, context) => {
            const id = args.id || context.auth;
            if (!id) throw new Error("Your session has expired!");
            const user = await User.findById(id).populate({
                path: "posts",
                populate: [
                    { path: "author", model: "User" },
                    { path: "reactions.user", model: "User" },
                    { path: "comments", populate: ["author", "likes"] },
                ],
            });
            if (!user) throw new Error("User doesn't exist!");
            const posts = user.posts.sort((a: PostBase, b: PostBase) => b.created_timestamp - a.created_timestamp);

            const response: ProfileData = {
                join_date: `Joined on ${formatTimestamp(user.join_timestamp, "date")}`,
                friend_count: `${user.friends.length} ${user.friends.length === 1 ? "friend" : "friends"}`,
                posts: posts.map((obj: PostBase) => getPostSummary(obj, context.auth)),
            };
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
