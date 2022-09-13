import { AiFillWarning } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { BsExclamationLg, BsQuestion } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

import { Button } from "@common";

interface DialogProps {
    closeDialog: () => void;
    message: string;
    variant: "success" | "error" | "help" | "warning" | "info";
}

const Dialog = ({ message, variant, closeDialog }: DialogProps) => {
    let icon;

    switch (variant) {
        case "error":
            icon = <FaTimes className="dialog__icon" />;
            break;
        case "help":
            icon = <BsQuestion className="dialog__icon" />;
            break;
        case "warning":
            icon = <AiFillWarning className="dialog__icon" />;
            break;
        case "info":
            icon = <BsExclamationLg className="dialog__icon" />;
            break;
        default:
            icon = <BiCheckCircle className="dialog__icon" />;
            break;
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).className === "dialog") closeDialog();
    };

    return (
        <div className="dialog" onClick={handleClick}>
            <div className="dialog__content">
                <section className={`dialog__header ${variant || "success"}`}>{icon}</section>
                <p className="dialog__message">{message}</p>
                <section className="dialog__footer">
                    <Button click={closeDialog}>OK</Button>
                </section>
            </div>
        </div>
    );
};

export default Dialog;
