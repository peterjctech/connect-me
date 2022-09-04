import { useState } from "react";

export default function () {
    const [dialog, setDialog] = useState(false);
    const [dialogProps, setDialogProps] = useState<{
        message: string;
        variant: "success" | "info" | "warning" | "error" | "help";
        closeDialog: () => void;
    }>({
        message: "",
        variant: "success",
        closeDialog: () => setDialog(false),
    });

    const openDialog = (message: string, variant?: "success" | "info" | "help" | "warning" | "error") => {
        setDialog(true);
        setDialogProps({ ...dialogProps, message, variant: variant || "success" });
    };

    return { dialog, openDialog, dialogProps };
}
