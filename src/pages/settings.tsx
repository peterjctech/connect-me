import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { GET_MY_SETTINGS } from "@queries";
import { Button, Dialog, Form, Dropdown, Input } from "@common";
import { Loading } from "@components";
import { client } from "@utils";
import { useDialog, useForm } from "@hooks";
import { ColorThemes, MainThemes, StoreInterface, Visibility, MySettings } from "@types";

const initialState: MySettings = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    theme: "Light",
    color: "Blue",
    friend_visibility: "Everyone",
    group_visibility: "Everyone",
    post_visibility: "Everyone",
    event_visibility: "Everyone",
};

const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState({
        main: { icon: AiFillEye, show: false },
        confirm: { icon: AiFillEye, show: false },
    });
    const { dialog, openDialog, dialogProps } = useDialog();
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { formData, handleChange, setFormData } = useForm(initialState);

    const getSettings = async () => {
        setLoading(true);
        const { data } = await client.query({ query: GET_MY_SETTINGS });
        setFormData(data.getMySettings);
        setLoading(false);
    };
    const updateShowPassword = (type: "main" | "confirm") => {
        setShowPassword({
            ...showPassword,
            [type]: {
                icon: showPassword[type].show ? AiFillEye : AiFillEyeInvisible,
                show: !showPassword[type].show,
            },
        });
    };
    const formatOptions = (arr: string[]) => {
        return arr.map((item) => {
            return { label: item, value: item };
        });
    };

    useEffect(() => {
        getSettings();
    }, [userStore.is_initialized]);

    const themes: MainThemes[] = ["Light", "Void", "Dark"];
    const colors: ColorThemes[] = ["Red", "Blue", "Green", "Purple"];
    const visibility: Visibility[] = ["Everyone", "Friends", "Nobody"];

    const themeOptions = formatOptions(themes);
    const colorOptions = formatOptions(colors);
    const visibilityOptions = formatOptions(visibility);

    const updateSettings = async () => {
        console.log(formData);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="settings-page">
            {dialog && <Dialog {...dialogProps} />}
            <div className="container">
                <Form title="Settings" submit={{ func: updateSettings }}>
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
                            name="password"
                            type={showPassword.main.show ? "text" : "password"}
                            value={formData.password}
                            handleChange={handleChange}
                            placeholder="Password"
                            icon={{
                                SVG: <showPassword.main.icon onClick={() => updateShowPassword("main")} />,
                                position: "right",
                            }}
                        />
                        <Input
                            name="confirmPassword"
                            type={showPassword.confirm.show ? "text" : "password"}
                            value={formData.confirmPassword}
                            handleChange={handleChange}
                            placeholder="Confirm Password"
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
