import dayjs from "dayjs";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Resolvers } from "@apollo/client";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { User, Post } from "models";
import { validateUserRegistration, validateUpdateSettings } from "validators";
import { formatDate, getCreatedAt, getListAndCount, getReactionDisplay, formatDatetime } from "utils";
import {
    initializeStorePipeline,
    userSettingsPipeline,
    userLayoutDataPipeline,
    userEventsPipeline,
    userFriendsPipeline,
    userGroupsPipeline,
    userPostsPipeline,
    userTagsPipeline,
    exploreUsersPipeline,
    exploreUsersPrepipeline,
} from "services";

const userResolvers: Resolvers = {
    Query: {
        initializeStore: async (_, __, context) => {
            if (!context.auth) return null;
            const pipeline = initializeStorePipeline({ authId: context.auth });
            const response = await User.aggregate(pipeline).then((data) => {
                if (!data[0]) return null;
                return {
                    ...data[0],
                    joined_at: formatDate(data[0].joined_at),
                    birthday: formatDate(data[0].birthday),
                };
            });
            return response;
        },
        getUserSettings: async (_, __, context) => {
            const pipeline = userSettingsPipeline({ authId: context.auth });
            const response = await User.aggregate(pipeline).then((data) => data[0]);
            return response;
        },
        getUserLayoutData: async (_, args, context) => {
            console.time("getUserLayoutData");
            const pipeline = userLayoutDataPipeline({ authId: context.auth, userId: args.userId });
            const response = await User.aggregate(pipeline).then((data) => {
                if (data[0]) {
                    return {
                        ...data[0],
                        joined_at: formatDate(data[0].joined_at),
                        birthday: formatDate(data[0].birthday),
                    };
                }

                return null;
            });
            console.timeEnd("getUserLayoutData");
            return response;
        },
        getUserPosts: async (_, args, context) => {
            console.time("getUserPosts");
            let next_skip_timestamp = dayjs().unix();
            const pipeline = userPostsPipeline({
                authId: context.auth,
                userId: args.userId,
                isFriend: args.isFriend,
                skipTimestamp: args.skipTimestamp,
            });

            const posts = await Post.aggregate(pipeline).then((data) => {
                if (data.length > 0) next_skip_timestamp = dayjs(data[data.length - 1].created_at).unix();
                return data.map((post) => {
                    return {
                        ...post,
                        created_at: getCreatedAt(post.created_at),
                        recent_comments: post.recent_comments.map((comment: any) => {
                            return {
                                ...comment,
                                created_at: getCreatedAt(comment.created_at),
                                likes: getListAndCount(comment.likes),
                            };
                        }),
                        reaction_display: getReactionDisplay(post.reaction_display),
                    };
                });
            });

            console.timeEnd("getUserPosts");
            return { posts, next_skip_timestamp };
        },
        getUserFriends: async (_, args, context) => {
            const pipeline = userFriendsPipeline({
                authId: context.auth,
                userId: args.userId,
                isFriend: args.isFriend,
                privacy: args.privacy,
            });
            const response = await User.aggregate(pipeline);
            return response;
        },
        getUserGroups: async (_, args, context) => {
            const pipeline = userGroupsPipeline({
                authId: context.auth,
                userId: args.userId,
                privacy: args.privacy,
                isFriend: args.isFriend,
            });
            const response = await User.aggregate(pipeline);
            return response;
        },
        getUserTags: async (_, args, context) => {
            const pipeline = userTagsPipeline({ authId: context.auth, userId: args.userId });
            const response = await User.aggregate(pipeline);
            return response;
        },
        getUserEvents: async (_, args, context) => {
            const pipeline = userEventsPipeline({
                authId: context.auth,
                userId: args.userId,
                privacy: args.privacy,
                isFriend: args.isFriend,
            });
            const response = await User.aggregate(pipeline).then((data) => {
                return data.map((event) => {
                    return { ...event, datetime: formatDatetime(event.datetime) };
                });
            });
            return response;
        },
        exploreUsers: async (_, args, context) => {
            const prePipeline = exploreUsersPrepipeline(context.auth);
            const authFriends = await User.aggregate(prePipeline).then((data) => data[0].friends);
            const pipeline = exploreUsersPipeline({ authId: context.auth, authFriends, skipNumber: args.skipNumber });
            const response = await User.aggregate(pipeline);

            return response;
        },
    },
    Mutation: {
        updateUserSettings: async (_, args, context) => {
            cloudinary.v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            const user = await User.findById(context.auth);
            if (!user) throw new Error("Logged in user does not exist!");
            if (user.username === "hackerman123")
                throw new Error(
                    "hackerman123 cannot be updated for showcase purposes. If you would like to test out this feature, please register with a new account."
                );
            let newSettings = await validateUpdateSettings(args, user);
            if (args.profile_picture) {
                const profilePicture = user.profile_picture;
                if (profilePicture.startsWith("https://res.cloudinary.com")) {
                    const publicId = profilePicture.split("/")[profilePicture.split("/").length - 1].split(".")[0];
                    await cloudinary.v2.uploader.destroy(publicId);
                }
                const newProfilePicture = await cloudinary.v2.uploader.upload(args.profile_picture);
                newSettings.profile_picture = newProfilePicture.secure_url;
            }

            try {
                await User.findByIdAndUpdate(context.auth, newSettings);
                return { message: "Successfully updated user settings!" };
            } catch (error) {
                throw new Error("Failed to update your settings");
            }
        },
        registerUser: async (_, args) => {
            const model = await validateUserRegistration(args);

            try {
                await User.create(model);
                return { message: `Successfully created user ${model.username}` };
            } catch (error) {
                throw new Error("An unexpected error has occurred");
            }
        },
        loginUser: async (_, args, { req, res }) => {
            const user = await User.findOne({ username: args.username });
            console.log(user._id);
            if (!user) throw new Error("Invalid credentials");

            const compareHash = await bcrypt.compare(args.password, user.password);
            if (!compareHash) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
                expiresIn: 60 * 60 * 24,
            });
            setCookie(process.env.SERVER_KEY!, token, { req, res, maxAge: 60 * 60 * 24 });

            return { message: `Logged in as ${user.username}` };
        },
        logoutUser: async (_, __, { req, res }) => {
            deleteCookie(process.env.SERVER_KEY!, { req, res });
            return { message: "Successfully logged out!" };
        },
    },
};

export default userResolvers;
