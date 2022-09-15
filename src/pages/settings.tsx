import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { GET_MY_SETTINGS } from "@queries";
import { UPDATE_USER_SETTINGS } from "@mutations";
import { Dialog } from "@common";
import { Loading } from "@components";
import { ConfirmIdentity, SettingsForm } from "@domain";
import { client } from "@utils";
import { useDialog, useForm } from "@hooks";
import { updateUserStore } from "@store";
import { StoreInterface, UpdateUserSettingsProps } from "@types";

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
    const { dialog, openDialog, dialogProps } = useDialog();
    const { formData, handleChange, setFormData } = useForm(initialFormState);
    const userStore = useSelector((store: StoreInterface) => store.user);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        getSettings();
    }, [userStore.is_initialized]);

    const getSettings = async () => {
        setLoading(true);
        try {
            const { data } = await client.query({ query: GET_MY_SETTINGS });
            setFormData({ ...data.getMySettings, new_password: "", confirm_new_password: "", old_password: "" });
        } catch (error) {
            openDialog("Failed to get user settings", "error");
        }
        setLoading(false);
    };

    const toggleModal = async () => {
        setShowModal(!showModal);
    };

    const finishForm = async () => {
        toggleModal();

        try {
            const { data } = await client.mutate({ mutation: UPDATE_USER_SETTINGS, variables: formData });
            openDialog(data.updateUserSettings.message, "info");

            setTimeout(() => {
                router.reload();
            }, 750);
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
            <div className="box theme">
                <SettingsForm toggleModal={toggleModal} formData={formData} handleChange={handleChange} />
            </div>
        </main>
    );
};

export default SettingsPage;
