import { Resolvers } from "@apollo/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookie, deleteCookie } from "cookies-next";
import { UserData, UserModel, UserStoreData, UserSummary, ProfileData } from "@types";
import { User } from "@models";
import { getFullName } from "@utils";
import { getMe, getUserSummary, getUserData, getProfileData } from "@services";

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
        getAllUsers: async (_, __, context) => {
            const me = await getMe(context.auth);
            const users: UserModel[] = me ? await User.find({ _id: { $ne: me._id } }) : await User.find();

            const response: UserSummary[] = users.map((obj) => getUserSummary(obj, me));
            return { users: response };
        },
        getUserData: async (_, args, context) => {
            const me = await getMe(context.auth);
            const user = await User.findById(args.userId)
                .populate("friends.user_id")
                .populate("groups.group_id")
                .populate("posts")
                .populate("interests.interest_id")
                .populate("events.event_id");
            if (!user) throw new Error("User does not exist!");

            const response: UserData = getUserData(user, me);
            return response;
        },
        getProfileData: async (_, __, context) => {
            // const me = await getMe(context.auth);
            if (!context.auth) throw new Error("User is not logged in!");
            const model = await User.findById(context.auth);
            if (!model) throw new Error("User does not exist anymore");
            const populated = await model
                .populate("friends.user_id")
                .populate("groups.group_id")
                .populate({
                    path: "posts",
                    model: "Post",
                    populate: {
                        path: "author_id",
                        model: "User",
                    },
                })
                .popluate("interests.interest_id")
                .populate("events.event_id");

            const response: ProfileData = getProfileData(populated, model);
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
