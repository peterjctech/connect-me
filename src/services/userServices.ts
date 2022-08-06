import { User } from "@models";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { UserModel } from "@types";

interface CreateUserArgs {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

interface LoginUserArgs {
    username: string;
    password: string;
}

export const createUserProps = async ({ firstName, lastName, username, password, confirmPassword }: CreateUserArgs) => {
    if (!firstName) throw new Error("First name cannot be empty");
    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (username.length < 6 || username.length > 20) throw new Error("Username must be between 6 and 20 characters");
    if (password.length < 6 || password.length > 20) throw new Error("Password must be between 6 and 20 characters");
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const user = await User.findOne({ username });
    if (user) throw new Error("Username already exists");

    return {
        first_name: firstName,
        last_name: lastName,
        username,
        password: bcrypt.hashSync(password, 10),
        join_date: dayjs().unix(),
    };
};

export const loginUser = async ({ username, password }: LoginUserArgs) => {
    const user: UserModel | null = await User.findOne({ username });
    if (!user) return null;
    const compareHash = bcrypt.compareSync(password, user.password);
    if (!compareHash) return null;

    return user;
};
