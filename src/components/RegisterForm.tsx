import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Form, Modal, Input } from "@common";
import { useForm } from "@hooks";
import { REGISTER_USER } from "@mutations";
import { client } from "@utils";

interface RegisterFormProps {
    closeModal: () => void;
    openDialog: (message: string, variant?: "error") => void;
}

const RegisterForm = ({ closeModal, openDialog }: RegisterFormProps) => {
    const [showPassword, setShowPassword] = useState({
        main: {
            icon: AiFillEye,
            show: false,
        },
        confirm: {
            icon: AiFillEye,
            show: false,
        },
    });
    const { formData, handleChange } = useForm({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const registerUser = async () => {
        try {
            const { data } = await client.mutate({ mutation: REGISTER_USER, variables: formData });
            openDialog(data.registerUser.message);
        } catch (error: any) {
            const handledErrors = error.graphQLErrors;
            const errorMessage = handledErrors[0] ? handledErrors[0].message : "An unexpected error has occurred";
            openDialog(errorMessage, "error");
        }
    };

    const updateShowPassword = (type: "main" | "confirm") => {
        setShowPassword({
            ...showPassword,
            [type]: {
                icon: showPassword[type].show ? AiFillEye : AiFillEyeInvisible,
                show: !showPassword[type].show,
            },
        });
    };

    return (
        <Modal closeModal={closeModal}>
            <Form title="Register" submit={{ func: registerUser }}>
                <span>
                    <Input
                        name="firstName"
                        value={formData.firstName}
                        handleChange={handleChange}
                        placeholder="First Name"
                    />
                    <Input
                        name="lastName"
                        value={formData.lastName}
                        handleChange={handleChange}
                        placeholder="Last Name"
                    />
                </span>
                <Input name="username" value={formData.username} handleChange={handleChange} placeholder="Username" />
                <Input
                    name="password"
                    type={showPassword.main.show ? "text" : "password"}
                    value={formData.password}
                    handleChange={handleChange}
                    placeholder="Password"
                    icon={{
                        SVG: <showPassword.main.icon onClick={() => updateShowPassword("main")} />,
                        position: "right",
                    }}
                />
                <Input
                    name="confirmPassword"
                    type={showPassword.confirm.show ? "text" : "password"}
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    placeholder="Confirm Password"
                    icon={{
                        SVG: <showPassword.confirm.icon onClick={() => updateShowPassword("confirm")} />,
                        position: "right",
                    }}
                />
            </Form>
        </Modal>
    );
};

export default RegisterForm;
