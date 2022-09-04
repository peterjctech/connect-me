import { RegisterUserProps } from "@types";
import { User } from "@models";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export const createUserModel = async (props: RegisterUserProps) => {
    const { firstName, lastName, username, password, confirmPassword } = props;

    if (!firstName) throw new Error("First name cannot be empty");
    if (!lastName) throw new Error("Last name cannot be empty");
    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (username.length < 6 || username.length > 20) throw new Error("Username must be between 6 and 20 characters");
    if (password.length < 6 || password.length > 20) throw new Error("Password must be between 6 and 20 characters");
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const user = await User.findOne({ username: username });
    if (user) throw new Error("Username already exists");

    return {
        username,
        password: bcrypt.hashSync(password, 10),
        first_name: firstName,
        last_name: lastName,
        join_timestamp: dayjs().unix(),
    };
};
