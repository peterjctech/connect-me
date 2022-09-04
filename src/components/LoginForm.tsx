import { Form, Input } from "@common";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useForm } from "@hooks";
import { LOGIN_USER } from "@mutations";
import { client } from "@utils";

interface LoginFormProps {
    toggleModal: () => void;
    openDialog: (message: string, variant?: "error") => void;
}

const LoginForm = ({ toggleModal, openDialog }: LoginFormProps) => {
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
    });

    const loginUser = async () => {
        try {
            const { data } = await client.mutate({ mutation: LOGIN_USER, variables: formData });
            openDialog(data.loginUser.message);
        } catch (error: any) {
            openDialog(error.graphQLErrors[0].message, "error");
        }
    };
    return (
        <Form
            title="Log In to ConnectMe"
            submit={loginUser}
            linkText="Not a member yet? Register here!"
            linkSubmit={toggleModal}
        >
            <Input
                name="username"
                value={formData.username}
                handleChange={handleChange}
                placeholder="Username"
                icon={<FaUserAlt />}
            />
            <Input
                name="password"
                type="password"
                value={formData.password}
                handleChange={handleChange}
                placeholder="Password"
                icon={<FaLock />}
            />
        </Form>
    );
};

export default LoginForm;
