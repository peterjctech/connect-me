import { Button } from "@components";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { useHotkey } from "@hooks";

interface DialogProps {
    closeDialog: () => void;
    message: string;
    variant?: string;
}

const Dialog = ({ message, variant, closeDialog }: DialogProps) => {
    let icon = <BiCheckCircle className="dialog__icon" />;

    switch (variant) {
        case "error":
            icon = <FaTimes className="dialog__icon" />;
            break;
    }

    useHotkey({
        code: "Enter",
        callback: closeDialog,
    });

    return (
        <div
            className="dialog"
            onClick={(event) => {
                const target = (event.target as HTMLInputElement).className;
                if (target === "dialog") closeDialog();
            }}
        >
            <div className="dialog__content">
                <section className={`dialog__header bg-${variant || "success"}`}>{icon}</section>
                <p className="dialog__message">{message}</p>
                <section className="dialog__footer">
                    <Button click={closeDialog} variant="info">
                        OK
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default Dialog;
