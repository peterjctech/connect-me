import { UserModel } from "@models";

interface CreateUserArgs {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export const createUserProps = async ({ firstName, lastName, username, password, confirmPassword }: CreateUserArgs) => {
    const errors = [];
    if (!firstName) errors.push("First name cannot be empty");
    if (!username) errors.push("Username cannot be empty");
    if (!password) errors.push("Password cannot be empty");
    if (password !== confirmPassword) errors.push("Passwords do not match");

    const user = await UserModel.findOne({ username });
    if (user) errors.push("Username already exists");

    if (errors.length > 0) return { errors };

    return {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
    };
};
