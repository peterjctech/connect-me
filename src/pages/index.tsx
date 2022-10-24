import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
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
            <br />
            <h4>
                ConnectMe is a work in progress. To fully experience this demo, login using the following credentials.
            </h4>
            <br />
            <p>Username: hackerman123</p>
            <p>Password: 12345</p>
            <br />
            <Link href="/info">
                <a className="link">Click here to see the current list of upcoming feature additions</a>
            </Link>
        </main>
    );
};

export default HomePage;
