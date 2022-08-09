import { Resolvers } from "@apollo/client";
import jwt from "jsonwebtoken";
import { deleteCookie, setCookie } from "cookies-next";
import { User } from "@models";
import { createUserModel, parseMe, parseUserData } from "@services";
import { UserProps, UserModel } from "@types";
import bcrypt from "bcrypt";

const userResolvers: Resolvers = {
    Query: {
        async getMe(_, __, context) {
            if (!context.auth) return null;
            const data = await parseMe(context.auth);
            return data;
        },
        async getUser(_, args) {
            const data = await parseUserData(args.id);
            return data;
        },
        async getAllUsers() {
            const users = await User.find();
            return {
                users: users.map((obj) => {
                    return {
                        _id: obj._id,
                        full_name: `${obj.first_name} ${obj.last_name}`,
                        profile_picture: obj.profile_picture,
                    };
                }),
            };
        },
    },
    Mutation: {
        async createUser(_, args: UserProps) {
            const props = await createUserModel(args);
            await User.create(props);
            return { message: `Successfully created user ${props.username}` };
        },
        async loginUser(_, args, { req, res }) {
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
        async logoutUser(_, __, { req, res }) {
            deleteCookie("server-key", { req, res });
            return { message: "Successfully logged out!" };
        },
        async deleteUser(_, args) {
            const user = await User.findById(args.id);
            if (!user) throw new Error("User doesn't exist!");
            await User.deleteOne({ _id: user._id });
            return { message: `Successfully deleted user ${user.username}` };
        },
    },
};

export default userResolvers;
