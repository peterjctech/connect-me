import { FaUserAlt, FaLock } from "react-icons/fa";
import { Input, Form } from "common";
import { useForm, usePassword } from "hooks";
import { LOGIN_USER } from "@mutations";
import { client } from "utils";
import { useRouter } from "next/router";

interface LoginFormProps {
    toggleModal: () => void;
    openDialog: (message: string, variant?: "error") => void;
}

const LoginForm = ({ toggleModal, openDialog }: LoginFormProps) => {
    const { showPassword, updateShowPassword } = usePassword();
    const router = useRouter();
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
    });

    const loginUser = async () => {
        try {
            const { data } = await client.mutate({ mutation: LOGIN_USER, variables: formData });

            openDialog(data.loginUser.message);

            setTimeout(() => {
                router.reload();
            }, 750);
        } catch (error: any) {
            const handledErrors = error.graphQLErrors;
            const errorMessage = handledErrors[0] ? handledErrors[0].message : "An unexpected error has occurred";
            openDialog(errorMessage, "error");
        }
    };

    return (
        <Form
            title="Log In to ConnectMe"
            submit={{ func: loginUser }}
            link={{ func: toggleModal, text: "Not a member yet? Register here!" }}
        >
            <Input
                name="username"
                value={formData.username}
                placeholder="Username"
                handleChange={handleChange}
                iconLeft={<FaUserAlt />}
            />
            <Input
                name="password"
                type={showPassword.main.show ? "text" : "password"}
                value={formData.password}
                handleChange={handleChange}
                placeholder="Password"
                iconLeft={<FaLock />}
                iconRight={<showPassword.main.icon onClick={() => updateShowPassword("main")} />}
            />
        </Form>
    );
};

export default LoginForm;
