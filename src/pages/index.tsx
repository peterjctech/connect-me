import { useState } from "react";

import { LoginForm, RegisterForm } from "@domain";
import { useDialog } from "@hooks";
import { Dialog } from "@common";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const { dialog, openDialog, dialogProps } = useDialog();

    const toggleModal = () => setShowModal(!showModal);

    return (
        <main>
            <div className="container">
                {dialog && <Dialog {...dialogProps} />}
                <LoginForm toggleModal={toggleModal} openDialog={openDialog} />
                {showModal && <RegisterForm closeModal={toggleModal} openDialog={openDialog} />}
            </div>
        </main>
    );
};

export default HomePage;
