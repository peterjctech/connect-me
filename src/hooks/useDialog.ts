import { useState } from "react";

interface UseDialogProps {
    message: string;
    variant: "success" | "info" | "warning" | "error" | "help";
    closeDialog: () => void;
}

const useDialog = () => {
    const [dialog, setDialog] = useState(false);
    const [dialogProps, setDialogProps] = useState<UseDialogProps>({
        message: "",
        variant: "success",
        closeDialog: () => setDialog(false),
    });

    const openDialog = (message: string, variant?: "success" | "info" | "help" | "warning" | "error") => {
        setDialog(true);
        setDialogProps({ ...dialogProps, message, variant: variant || "success" });
    };

    return { dialog, openDialog, dialogProps };
};

export default useDialog;
