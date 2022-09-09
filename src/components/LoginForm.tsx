import { FaLock, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/router";

import { Form, Input } from "@common";
import { useForm } from "@hooks";
import { LOGIN_USER } from "@mutations";
import { client } from "@utils";
import { LoginUserProps } from "@types";

interface LoginFormProps {
    toggleModal: () => void;
    openDialog: (message: string, variant?: "error") => void;
}

const initialFormState: LoginUserProps = {
    username: "",
    password: "",
};

const LoginForm = ({ toggleModal, openDialog }: LoginFormProps) => {
    const router = useRouter();
    const { formData, handleChange } = useForm(initialFormState);

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
            link={{ text: "Not a member yet? Register here!", func: toggleModal }}
        >
            <Input
                name="username"
                value={formData.username}
                handleChange={handleChange}
                placeholder="Username"
                icon={{ SVG: <FaUserAlt />, position: "left" }}
            />
            <Input
                name="password"
                type="password"
                value={formData.password}
                handleChange={handleChange}
                placeholder="Password"
                icon={{ SVG: <FaLock />, position: "left" }}
            />
        </Form>
    );
};

export default LoginForm;
