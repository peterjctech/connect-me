import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GET_MY_SETTINGS } from "@queries";
import { UPDATE_USER_SETTINGS } from "@mutations";
import { Dialog, Form, Dropdown, Input } from "@common";
import { Loading } from "@components";
import { client } from "@utils";
import { useDialog, useForm, usePassword } from "@hooks";
import { ColorThemes, MainThemes, StoreInterface, Visibility, UpdateUserSettingsProps } from "@types";
import ConfirmIdentity from "components/settings/ConfirmIdentity";
import { updateUserStore } from "@store";

const initialFormState: UpdateUserSettingsProps = {
    first_name: "",
    last_name: "",
    username: "",
    new_password: "",
    confirm_new_password: "",
    old_password: "",
    theme: "Light",
    color: "Blue",
    friend_visibility: "Everyone",
    group_visibility: "Everyone",
    post_visibility: "Everyone",
    event_visibility: "Everyone",
};

const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { showPassword, updateShowPassword } = usePassword();
    const { dialog, openDialog, dialogProps } = useDialog();
    const { formData, handleChange, setFormData } = useForm(initialFormState);
    const userStore = useSelector((store: StoreInterface) => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        getSettings();
    }, [userStore.is_initialized]);

    const getSettings = async () => {
        setLoading(true);
        try {
            const { data } = await client.query({ query: GET_MY_SETTINGS });
            setFormData({ ...data.getMySettings, new_password: "", confirm_new_password: "", old_password: "" });
        } catch (error) {
            openDialog("Failed to get user settings");
        }
        setLoading(false);
    };

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

    const toggleModal = async () => {
        setShowModal(!showModal);
    };

    const finishForm = async () => {
        toggleModal();

        try {
            const { data } = await client.mutate({ mutation: UPDATE_USER_SETTINGS, variables: formData });
            const { theme, color, first_name, last_name } = data.updateUserSettings;
            setFormData({ ...data.updateUserSettings, new_password: "", confirm_new_password: "", old_password: "" });
            dispatch(updateUserStore({ theme, color, full_name: `${first_name} ${last_name}` }));
            console.log(userStore);
        } catch (error: any) {
            const handledErrors = error.graphQLErrors;
            const errorMessage = handledErrors[0] ? handledErrors[0].message : "An unexpected error has occurred";
            setFormData({ ...formData, new_password: "", confirm_new_password: "", old_password: "" });
            openDialog(errorMessage, "error");
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="settings-page">
            {dialog && <Dialog {...dialogProps} />}
            {showModal && (
                <ConfirmIdentity
                    closeModal={toggleModal}
                    finishForm={finishForm}
                    handleChange={handleChange}
                    oldPassword={formData.old_password}
                />
            )}
            <div className="container">
                <Form title="Settings" submit={{ func: toggleModal }}>
                    <h6>General</h6>
                    <Input
                        name="username"
                        value={formData.username}
                        handleChange={handleChange}
                        placeholder="Username"
                    />
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
            </div>
        </main>
    );
};

export default SettingsPage;
