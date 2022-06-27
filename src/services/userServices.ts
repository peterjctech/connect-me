import { CreateUserArgs } from "@interfaces";
import { User } from "@models";

export const checkCreateUser = async (args: CreateUserArgs) => {
    if (!args.username) return { error: "Username cannot be empty!" };
    if (!args.password) return { error: "Password cannot be empty!" };
    if (!args.firstName) return { error: "First name cannot be empty!" };
    if (args.password !== args.confirmPassword) return { error: "Passwords do not match!" };

    const user = await User.findOne({ username: args.username });
    if (user) return { error: "User already exists!" };

    return {
        username: args.username,
        password: args.password,
        first_name: args.firstName,
        last_name: args.lastName || null,
        profile_picture: args.profilePicture || null,
    };
};
