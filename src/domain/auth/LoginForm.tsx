import { Form, Input, Dialog } from "@components";
import { useForm, useDialog } from "@hooks";
import { LOGIN_USER } from "@mutations";
import { client } from "@utils";

const LoginForm = () => {
    const { dialog, openDialog, dialogProps } = useDialog();
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
    });

    const loginUser = async () => {
        try {
            const response = await client.mutate({ mutation: LOGIN_USER, variables: formData });
            openDialog(response.data.loginUser.message, "success");
        } catch (error: any) {
            const handledErrors = error.graphQLErrors;
            const errorMessage = handledErrors[0] ? handledErrors[0].message : "An unexpected error has occurred";
            openDialog(errorMessage, "error");
        }
    };

    const showRegisterForm = () => {
        console.log("show");
    };
    return (
        <Form
            title="Login Here!"
            submit={loginUser}
            submitText="Login"
            linkText="Not a member yet? Register here!"
            linkSubmit={showRegisterForm}
        >
            {dialog && <Dialog {...dialogProps} />}
            <Input name="username" value={formData.username} handleChange={handleChange} label="Username" />
            <Input
                name="password"
                value={formData.password}
                handleChange={handleChange}
                label="Password"
                type="password"
            />
        </Form>
    );
};

export default LoginForm;
