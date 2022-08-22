import { useState } from "react";

export default function () {
    const [dialog, setDialog] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        message: "",
        variant: "",
        closeDialog: () => {
            console.log("xd");
            setDialog(false);
        },
    });
    const openDialog = (message: string, variant?: string) => {
        setDialog(true);
        setDialogProps({ ...dialogProps, message, variant: variant || "" });
    };

    return { dialog, openDialog, dialogProps };
}
