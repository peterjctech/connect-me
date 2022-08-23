import { Resolvers } from "@apollo/client";
import { BaseProfileData, UserStoreData } from "@types";
import { formatTimestamp, getFullName } from "@utils";
import { UserModel } from "@types";
import { deleteCookie, setCookie } from "cookies-next";
import { User } from "@models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        getBaseProfileData: async (_, __, context) => {
            const user = await User.findById(context.auth).populate({
                path: "friends.user",
                select: ["_id", "profile_picture", "first_name", "last_name"],
            });
            console.log(user.friends[0]);
            const response: BaseProfileData = {
                join_date: formatTimestamp(user.join_timestamp, "date"),
                friend_count: user.friends.length,
                friends_preview: user.friends
                    .map((obj: any) => {
                        return {
                            user_id: obj.user._id,
                            full_name: getFullName(obj.user),
                            profile_picture: obj.user.profile_picture,
                        };
                    })
                    .slice(-8),
                group_count: user.groups.length,
                event_count: user.events.length,
                interest_count: user.interests.length,
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
