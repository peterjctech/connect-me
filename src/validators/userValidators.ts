import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { User } from "@models";
import { RegisterUserProps, UpdateUserSettingsProps, UserModel } from "@types";

interface NewSettings {
    username: string;
    password?: string;
    first_name: string;
    last_name: string;
    preferences: {
        theme: string;
        color: string;
        visibility: {
            friends: string;
            groups: string;
            posts: string;
            events: string;
        };
    };
}

export const validateUserRegistration = async (props: RegisterUserProps) => {
    const { firstName, lastName, username, password, confirmPassword } = props;

    if (!firstName) throw new Error("First name cannot be empty");
    if (!lastName) throw new Error("Last name cannot be empty");
    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (username.length < 6 || username.length > 20) throw new Error("Username must be between 6 and 20 characters");
    if (password.length < 4 || password.length > 20) throw new Error("Password must be between 4 and 20 characters");
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

export const validateUpdateSettings = async (props: UpdateUserSettingsProps, oldUser: UserModel) => {
    const { username, new_password, confirm_new_password, old_password, first_name, last_name } = props;

    if (!old_password) throw new Error("You must enter your old password to update your settings.");
    const compareHash = bcrypt.compareSync(old_password, oldUser.password);
    if (!compareHash) throw new Error("Invalid credentials");

    if (!first_name) throw new Error("First name cannot be empty");
    if (!last_name) throw new Error("Last name cannot be empty");
    if (!username) throw new Error("Username cannot be empty");
    if (username.length < 6 || username.length > 20) throw new Error("Username must be between 6 and 20 characters");
    if (new_password !== confirm_new_password) throw new Error("New passwords do not match");
    if (new_password && (new_password.length < 4 || new_password.length > 20)) {
        throw new Error("Password must be between 4 and 20 characters");
    }

    if (props.username !== oldUser.username) {
        const user = await User.findOne({ username });
        if (user) throw new Error("Username already exists");
    }

    let newSettings: NewSettings = {
        username,
        first_name,
        last_name,
        preferences: {
            theme: props.theme,
            color: props.color,
            visibility: {
                friends: props.friend_visibility,
                groups: props.group_visibility,
                posts: props.post_visibility,
                events: props.event_visibility,
            },
        },
    };
    if (new_password) newSettings = { ...newSettings, password: bcrypt.hashSync(new_password, 10) };

    return newSettings;
};
