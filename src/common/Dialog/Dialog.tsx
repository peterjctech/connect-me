import { AiFillWarning } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { BsExclamationLg, BsQuestion } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Button } from "common";

interface DialogProps {
    closeDialog: () => void;
    variant: "success" | "error" | "help" | "warning" | "info";
    message: string;
}

const Dialog = ({ closeDialog, variant, message }: DialogProps) => {
    let icon;

    switch (variant) {
        case "success":
            icon = <BiCheckCircle className="dialog__icon" />;
            break;
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
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).className === "dialog") closeDialog();
    };

    return (
        <div onClick={handleClick} className="dialog">
            <div className="dialog__content">
                <section className={`dialog__header ${variant || "success"}`}>{icon}</section>
                <p>{message}</p>
                <section className="dialog__footer">
                    <Button type="info" click={closeDialog}>
                        OK
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default Dialog;
