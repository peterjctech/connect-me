import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Dialog } from "common";
import { client } from "utils";
import { GET_USER_SETTINGS } from "@queries";
import { useDialog, useForm } from "hooks";
import { StoreInterface } from "types";
import { ConfirmIdentity, SettingsForm } from "components";
import { UPDATE_USER_SETTINGS } from "@mutations";

const initialFormState = {
    username: "",
    first_name: "",
    last_name: "",
    profile_picture: null,
    intro: "",
    theme: "Light",
    color: "Blue",
    default_post_is_public: "Yes",
    friend_privacy: "Everyone",
    group_privacy: "Everyone",
    event_privacy: "Everyone",
    new_password: "",
    confirm_new_password: "",
    old_password: "",
};

const SettingsPage: NextPage = () => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { dialog, openDialog, dialogProps } = useDialog();
    const { formData, handleChange, setFormData } = useForm(initialFormState);
    const userStore = useSelector((store: StoreInterface) => store.user);
    const router = useRouter();
    useEffect(() => {
        getSettings();
    }, [userStore.is_initialized]);

    const getSettings = async () => {
        setLoading(true);
        try {
            const { data } = await client.query({ query: GET_USER_SETTINGS });
            setFormData({
                ...data.getUserSettings,
                default_post_is_public: data.default_post_is_public ? "Yes" : "No",
                new_password: "",
                confirm_new_password: "",
                old_password: "",
                profile_picture: "",
            });
        } catch (error) {
            openDialog("Failed to get user settings", "error");
        }
        setLoading(false);
    };

    const toggleModal = async () => setShowModal(!showModal);

    const finishForm = async () => {
        toggleModal();

        try {
            const response = await client.mutate({ mutation: UPDATE_USER_SETTINGS, variables: formData });
            openDialog(response.data.updateUserSettings.message, "info");

            setTimeout(() => {
                router.reload();
            }, 750);
        } catch (error: any) {
            console.log(error);
            const handledErrors = error.graphQLErrors;
            const errorMessage = handledErrors[0] ? handledErrors[0].message : "An unexpected error has occurred";
            setFormData({ ...formData, new_password: "", confirm_new_password: "", old_password: "" });
            openDialog(errorMessage, "error");
        }
    };

    if (loading) {
        return <h1>Loading</h1>;
    }

    const handleImageChange = (event: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            setFormData({ ...formData, profile_picture: reader.result });
        };
        console.log(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <main>
            {dialog && <Dialog {...dialogProps} />}
            {showModal && (
                <ConfirmIdentity
                    closeModal={toggleModal}
                    finishForm={finishForm}
                    handleChange={handleChange}
                    oldPassword={formData.old_password}
                />
            )}
            <div className="box theme">
                <SettingsForm
                    toggleModal={toggleModal}
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                />
            </div>
        </main>
    );
};

export default SettingsPage;
