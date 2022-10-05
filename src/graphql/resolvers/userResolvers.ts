import cloudinary from "cloudinary";
import { User } from "models";
import { validateUserRegistration, validateUpdateSettings } from "validators";
import { UserModel } from "types";
import { Resolvers } from "@apollo/client";
import jwt from "jsonwebtoken";
import { setCookie, deleteCookie } from "cookies-next";
import bcrypt from "bcrypt";
import { initializeStorePipeline, getUserSettingsPipeline } from "services";
import { formatDate } from "utils";

const userResolvers: Resolvers = {
    Query: {
        initializeStore: async (_, __, context) => {
            if (!context.auth) return null;
            const pipeline = initializeStorePipeline({ selfId: context.auth });
            const response = await User.aggregate(pipeline).then((data) => {
                return {
                    ...data[0],
                    joined_at: formatDate(data[0].joined_at),
                    birthday: formatDate(data[0].birthday),
                };
            });

            if (!response) {
                deleteCookie(process.env.SERVER_KEY!, { req: context.req, res: context.res });
                return null;
            }
            return response;
        },
        getUserSettings: async (_, __, context) => {
            const pipeline = getUserSettingsPipeline({ selfId: context.auth });
            const response = await User.aggregate(pipeline).then((data) => data[0]);
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
            const user: UserModel | null = await User.findOne({ username: args.username });
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
