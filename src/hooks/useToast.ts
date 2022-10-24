import { useState } from "react";

interface UseToastProps {
    message: string;
    type: "success" | "info" | "warning" | "error" | "help";
}

const useToast = () => {
    const [toast, setToast] = useState(false);
    const [toastProps, setToastProps] = useState<UseToastProps>({
        message: "",
        type: "success",
    });

    const openToast = (message: string, type: "success" | "info" | "help" | "warning" | "error") => {
        setToast(true);
        setToastProps({ message, type });

        setTimeout(() => {
            setToast(false);
        }, 3000);
    };

    return { toast, openToast, toastProps };
};

export default useToast;
