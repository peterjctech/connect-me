import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { User } from "models";
import { RegisterUserProps, UserModel } from "types";

interface UpdateUserSettingsProps {
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    intro: string;
    theme: string;
    color: string;
    default_post_is_public: string;
    friend_privacy: string;
    group_privacy: string;
    event_privacy: string;
    new_password: string;
    confirm_new_password: string;
    old_password: string;
}

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

    let newSettings: any = {
        username,
        first_name,
        last_name,
        intro: props.intro,
        settings: {
            theme: props.theme,
            color: props.color,
            default_post_is_public: props.default_post_is_public === "Yes" ? true : false,
            group_privacy: props.group_privacy,
            event_privacy: props.event_privacy,
            friend_privacy: props.friend_privacy,
        },
    };

    if (new_password) newSettings = { ...newSettings, password: bcrypt.hashSync(new_password, 10) };

    return newSettings;
};

export const validateUserRegistration = async (props: RegisterUserProps) => {
    const { username, password, confirmPassword, firstName, lastName, birthDate, birthMonth, birthYear, intro } = props;

    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (username.length < 6 || username.length > 20) throw new Error("Username must be between 6 and 20 characters");
    if (password.length < 6 || password.length > 20) throw new Error("Password must be between 6 and 20 characters");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (!firstName) throw new Error("First name cannot be empty");
    if (!lastName) throw new Error("Last name cannot be empty");

    const user = await User.findOne({ username: username });
    if (user) throw new Error("Username already exists");

    console.log(user);

    const birthday = dayjs().year(parseInt(birthYear)).month(parseInt(birthMonth)).date(parseInt(birthDate));

    if (birthday.unix() > dayjs().subtract(14, "year").unix()) {
        throw new Error("You must be at least 14 years old to register");
    }

    return {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        birthday: birthday.toDate(),
        intro,
    };
};
