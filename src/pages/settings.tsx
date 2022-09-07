import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";

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
    theme: "Light",
    color: "Blue",
    friend_visibility: "Everyone",
    group_visibility: "Everyone",
    post_visibility: "Everyone",
    interest_visibility: "Everyone",
    event_visibility: "Everyone",
};

const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const { dialog, openDialog, dialogProps } = useDialog();
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { formData, handleChange, setFormData } = useForm(initialState);

    const getSettings = async () => {
        setLoading(true);
        const { data } = await client.query({ query: GET_MY_SETTINGS });
        setFormData(data.getMySettings);
        setLoading(false);
    };

    useEffect(() => {
        getSettings();
        console.log(userStore.profile_picture);
    }, [userStore.is_initialized]);

    const themeOptions: MainThemes[] = ["Light", "Void", "Dark"];
    const colorOptions: ColorThemes[] = ["Red", "Blue", "Green", "Purple"];
    const visibilityOptions: Visibility[] = ["Everyone", "Friends", "Nobody"];

    const updateSettings = async () => {
        console.log(formData);
    };

    if (loading) {
        return <Loading />;
    }

    const handleDropdown = (props: { name: string; value: string }) => {
        console.log(props);
    };

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
                    <h6>Themes</h6>
                    <span>
                        <Dropdown
                            name="theme"
                            value={formData.theme}
                            handleChange={handleDropdown}
                            options={themeOptions.map((obj) => {
                                return { label: obj, value: obj };
                            })}
                            placeholder="Theme"
                            icon={<BsFillPaletteFill />}
                        />
                        {/* <Dropdown
                            name="color"
                            value={formData.color}
                            handleChange={handleDropdown}
                            options={colorOptions}
                            placeholder="Color"
                            icon={<BiColorFill />}
                        /> */}
                    </span>
                    <h6>Privacy</h6>
                    {/* <Dropdown
                        name="friend_visibility"
                        value={formData.friend_visibility}
                        handleChange={handleChange}
                        options={visibilityOptions}
                        placeholder="Friend Visibility"
                    />
                    <Dropdown
                        name="group_visibility"
                        value={formData.group_visibility}
                        handleChange={handleChange}
                        options={visibilityOptions}
                        placeholder="Group Visibility"
                    />
                    <Dropdown
                        name="post_visibility"
                        value={formData.post_visibility}
                        handleChange={handleChange}
                        options={visibilityOptions}
                        placeholder="Post Visibility"
                    />
                    <Dropdown
                        name="interest_visibility"
                        value={formData.interest_visibility}
                        handleChange={handleChange}
                        options={visibilityOptions}
                        placeholder="Interest Visibility"
                    />
                    <Dropdown
                        name="event_visibility"
                        value={formData.event_visibility}
                        handleChange={handleChange}
                        options={visibilityOptions}
                        placeholder="Event Visibility"
                    /> */}
                </Form>
            </div>
        </main>
    );
};

export default SettingsPage;
