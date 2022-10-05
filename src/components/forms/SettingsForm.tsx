import { AiFillCheckCircle } from "react-icons/ai";
import { usePassword } from "hooks";
import { Input, Form, Dropdown } from "common";
import { colorThemeEnum, mainThemeEnum, privacyOptionEnum } from "utils";

interface SettingsFormProps {
    toggleModal: () => void;
    formData: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImageChange: (changeEvent: any) => void;
}

const SettingsForm = ({ toggleModal, formData, handleChange, handleImageChange }: SettingsFormProps) => {
    const { showPassword, updateShowPassword } = usePassword();
    const formatOptions = (arr: string[]) => {
        return arr.map((item) => {
            return { label: item, value: item };
        });
    };

    const boolOptions = formatOptions(["Yes", "No"]);
    const themeOptions = formatOptions(mainThemeEnum);
    const colorOptions = formatOptions(colorThemeEnum);
    const privacyOptions = formatOptions(privacyOptionEnum);

    return (
        <Form title="Settings" submit={{ func: toggleModal }}>
            <label className={`input-file${formData.profile_picture ? " has-file" : ""}`}>
                <input type="file" name="file" onChange={handleImageChange} />
                Update Profile Picture
                {formData.profile_picture && <AiFillCheckCircle />}
            </label>
            <h6>General</h6>
            <Input name="username" value={formData.username} handleChange={handleChange} placeholder="Username" />
            <span>
                <Input
                    name="first_name"
                    value={formData.first_name}
                    handleChange={handleChange}
                    placeholder="First Name"
                />
                <Input
                    name="last_name"
                    value={formData.last_name}
                    handleChange={handleChange}
                    placeholder="Last Name"
                />
            </span>
            <Input name="intro" value={formData.intro} handleChange={handleChange} placeholder="Intro" />
            <h6>Update Password</h6>
            <span>
                <Input
                    name="new_password"
                    type={showPassword.main.show ? "text" : "password"}
                    value={formData.new_password}
                    handleChange={handleChange}
                    placeholder="New Password"
                    iconRight={<showPassword.main.icon onClick={() => updateShowPassword("main")} />}
                />
                <Input
                    name="confirm_new_password"
                    type={showPassword.confirm.show ? "text" : "password"}
                    value={formData.confirm_new_password}
                    handleChange={handleChange}
                    placeholder="Confirm New Password"
                    iconRight={<showPassword.confirm.icon onClick={() => updateShowPassword("confirm")} />}
                />
            </span>
            <h6>Themes</h6>
            <span>
                <Dropdown
                    name="theme"
                    value={formData.theme}
                    options={themeOptions}
                    handleChange={handleChange}
                    placeholder="Theme"
                />
                <Dropdown
                    name="color"
                    value={formData.color}
                    options={colorOptions}
                    handleChange={handleChange}
                    placeholder="Color"
                />
            </span>
            <h6>Privacy</h6>
            <span>
                <Dropdown
                    name="default_post_is_public"
                    value={formData.default_post_is_public}
                    options={boolOptions}
                    handleChange={handleChange}
                    placeholder="Posts Public By Default"
                />
                <Dropdown
                    name="friend_privacy"
                    value={formData.friend_privacy}
                    options={privacyOptions}
                    handleChange={handleChange}
                    placeholder="Groups"
                />
            </span>
            <span>
                <Dropdown
                    name="group_privacy"
                    value={formData.group_privacy}
                    options={privacyOptions}
                    handleChange={handleChange}
                    placeholder="Posts"
                />
                <Dropdown
                    name="event_privacy"
                    value={formData.event_privacy}
                    options={privacyOptions}
                    handleChange={handleChange}
                    placeholder="Events"
                />
            </span>
        </Form>
    );
};

export default SettingsForm;
