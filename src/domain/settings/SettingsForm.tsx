import { Form, Input, Dropdown } from "@common";
import { MainThemes, ColorThemes, Visibility } from "@types";
import { usePassword } from "@hooks";

interface SettingsFormProps {
    toggleModal: () => void;
    formData: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SettingsForm = ({ toggleModal, formData, handleChange }: SettingsFormProps) => {
    const { showPassword, updateShowPassword } = usePassword();
    const formatOptions = (arr: string[]) => {
        return arr.map((item) => {
            return { label: item, value: item };
        });
    };

    const themes: MainThemes[] = ["Light", "Void", "Dark"];
    const colors: ColorThemes[] = ["Red", "Blue", "Green", "Purple"];
    const visibility: Visibility[] = ["Everyone", "Friends", "Nobody"];

    const themeOptions = formatOptions(themes);
    const colorOptions = formatOptions(colors);
    const visibilityOptions = formatOptions(visibility);

    return (
        <Form title="Settings" submit={{ func: toggleModal }}>
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
            <h6>Update Password</h6>
            <span>
                <Input
                    name="new_password"
                    type={showPassword.main.show ? "text" : "password"}
                    value={formData.new_password}
                    handleChange={handleChange}
                    placeholder="New Password"
                    icon={{
                        SVG: <showPassword.main.icon onClick={() => updateShowPassword("main")} />,
                        position: "right",
                    }}
                />
                <Input
                    name="confirm_new_password"
                    type={showPassword.confirm.show ? "text" : "password"}
                    value={formData.confirm_new_password}
                    handleChange={handleChange}
                    placeholder="Confirm New Password"
                    icon={{
                        SVG: <showPassword.confirm.icon onClick={() => updateShowPassword("confirm")} />,
                        position: "right",
                    }}
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
                    name="friend_visibility"
                    value={formData.friend_visibility}
                    options={visibilityOptions}
                    handleChange={handleChange}
                    placeholder="Friends"
                />
                <Dropdown
                    name="group_visibility"
                    value={formData.group_visibility}
                    options={visibilityOptions}
                    handleChange={handleChange}
                    placeholder="Groups"
                />
            </span>
            <span>
                <Dropdown
                    name="post_visibility"
                    value={formData.post_visibility}
                    options={visibilityOptions}
                    handleChange={handleChange}
                    placeholder="Posts"
                />
                <Dropdown
                    name="event_visibility"
                    value={formData.event_visibility}
                    options={visibilityOptions}
                    handleChange={handleChange}
                    placeholder="Events"
                />
            </span>
        </Form>
    );
};

export default SettingsForm;
