import { Form, Modal, Input, Dialog } from "@common";
import { useForm, useDialog } from "@hooks";
import { REGISTER_USER } from "@mutations";
import { client } from "@utils";

interface RegisterFormProps {
    closeModal: () => void;
    openDialog: (message: string, variant?: "error") => void;
}

const RegisterForm = ({ closeModal, openDialog }: RegisterFormProps) => {
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
            openDialog(error.graphQLErrors[0].message, "error");
        }
    };

    return (
        <Modal closeModal={closeModal}>
            <Form title="Register" submit={registerUser}>
                <section>
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
                </section>
                <Input name="username" value={formData.username} handleChange={handleChange} placeholder="Username" />
                <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    handleChange={handleChange}
                    placeholder="Password"
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    placeholder="Confirm Password"
                />
            </Form>
        </Modal>
    );
};

export default RegisterForm;
