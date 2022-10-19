import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const usePassword = () => {
    const [showPassword, setShowPassword] = useState({
        main: { icon: AiFillEye, show: false },
        confirm: { icon: AiFillEye, show: false },
    });

    const updateShowPassword = (type: "main" | "confirm") => {
        setShowPassword({
            ...showPassword,
            [type]: {
                icon: showPassword[type].show ? AiFillEye : AiFillEyeInvisible,
                show: !showPassword[type].show,
            },
        });
    };

    return { showPassword, updateShowPassword };
};

export default usePassword;
