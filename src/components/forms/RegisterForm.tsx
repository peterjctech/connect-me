import dayjs from "dayjs";
import { useForm, usePassword } from "hooks";
import { client } from "utils";
import { REGISTER_USER } from "@mutations";
import { Modal, Form, Input, Dropdown } from "common";

interface RegisterFormProps {
    closeModal: () => void;
    openDialog: (message: string, variant?: "error") => void;
}

const RegisterForm = ({ closeModal, openDialog }: RegisterFormProps) => {
    const { showPassword, updateShowPassword } = usePassword();
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        birthDate: 1,
        birthMonth: "0",
        birthYear: 2000,
        intro: "",
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

    const months = [
        { label: "January", value: 0 },
        { label: "February", value: 1 },
        { label: "March", value: 2 },
        { label: "April", value: 3 },
        { label: "May", value: 4 },
        { label: "June", value: 5 },
        { label: "July", value: 6 },
        { label: "August", value: 7 },
        { label: "September", value: 8 },
        { label: "October", value: 9 },
        { label: "November", value: 10 },
        { label: "December", value: 11 },
    ];

    return (
        <Modal closeModal={closeModal}>
            <Form title="Register" submit={{ func: registerUser }}>
                <h6>Birthday</h6>
                <span>
                    <Dropdown
                        name="birthMonth"
                        value={formData.birthMonth}
                        options={months}
                        handleChange={handleChange}
                        placeholder="Month"
                    />
                    <span>
                        <Input
                            name="birthDate"
                            value={formData.birthDate}
                            handleChange={handleChange}
                            placeholder="Day"
                            type="number"
                            minmax={[1, 31]}
                        />
                        <Input
                            name="birthYear"
                            value={formData.birthYear}
                            handleChange={handleChange}
                            placeholder="Year"
                            type="number"
                            minmax={[1900, dayjs().year()]}
                        />
                    </span>
                </span>
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
                    iconRight={<showPassword.main.icon onClick={() => updateShowPassword("main")} />}
                />
                <Input
                    name="confirmPassword"
                    type={showPassword.confirm.show ? "text" : "password"}
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    placeholder="Confirm Password"
                    iconRight={<showPassword.confirm.icon onClick={() => updateShowPassword("confirm")} />}
                />
                <Input
                    name="intro"
                    value={formData.intro}
                    handleChange={handleChange}
                    placeholder="Intro"
                    label="Give a brief introduction about yourself"
                />
            </Form>
        </Modal>
    );
};

export default RegisterForm;
