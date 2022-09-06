import { useDispatch, useSelector } from "react-redux";
import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { useRouter } from "next/router";

import { testTheme, testColor } from "@store";
import { LOGOUT_USER } from "@mutations";
import { Button, Dialog, Form } from "@common";
import { client } from "@utils";
import { useDialog, useForm } from "@hooks";
import { StoreInterface } from "@types";

const SettingsPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { dialog, openDialog, dialogProps } = useDialog();
    const userStore = useSelector((store: StoreInterface) => store.user);
    const { formData, handleChange } = useForm({
        theme: userStore.theme,
        color: userStore.color,
    });

    const updateSettings = async () => {};

    const logout = async () => {
        try {
            const { data } = await client.mutate({ mutation: LOGOUT_USER });
            openDialog(data.logoutUser.message);

            setTimeout(() => {
                router.reload();
            }, 750);
        } catch (error: any) {
            const handledErrors = error.graphQLErrors;
            const errorMessage = handledErrors[0] ? handledErrors[0].message : "An unexpected error has occurred";
            openDialog(errorMessage, "error");
        }
    };
    return (
        <main className="settings-page">
            {dialog && <Dialog {...dialogProps} />}
            <div className="container">
                <Form title="Settings" submit={{ func: updateSettings }}>
                    <div onClick={() => dispatch(testTheme())}>
                        <BsFillPaletteFill />
                    </div>
                    <div onClick={() => dispatch(testColor())}>
                        <BiColorFill />
                    </div>
                    <Button click={logout}>Logout</Button>
                </Form>
            </div>
        </main>
    );
};

export default SettingsPage;
