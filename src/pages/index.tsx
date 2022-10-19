import { useState } from "react";
import type { NextPage } from "next";
import { Dialog } from "common";
import { LoginForm, RegisterForm } from "components";
import { useDialog } from "hooks";

const HomePage: NextPage = () => {
    const [showModal, setShowModal] = useState(false);
    const { dialog, openDialog, dialogProps } = useDialog();

    const toggleModal = () => setShowModal(!showModal);

    const seed = () => {
        fetch("/api/seed");
    };
    return (
        <main>
            <div className="box theme">
                {dialog && <Dialog {...dialogProps} />}
                <LoginForm toggleModal={toggleModal} openDialog={openDialog} />
                {showModal && <RegisterForm closeModal={toggleModal} openDialog={openDialog} />}
            </div>
        </main>
    );
};

export default HomePage;
