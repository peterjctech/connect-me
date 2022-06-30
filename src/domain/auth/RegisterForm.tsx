import { Button, Dialog, InputGroup } from "@components";
import { useForm, useHotkey, useDialog } from "@hooks";
import { CREATE_USER } from "@queries";
import { useMutation } from "@apollo/client";

interface RegisterFormProps {
    changeForm: () => void;
}

export default function ({ changeForm }: RegisterFormProps) {
    const { dialog, openDialog, dialogProps } = useDialog();
    const [createUser] = useMutation(CREATE_USER);
    const { formData, handleChange } = useForm({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const registerUser = async () => {
        const response = await createUser({ variables: formData });
        if (response.data.createUser.message) openDialog(response.data.createUser.message);
    };

    useHotkey({
        code: "Enter",
        callback: registerUser,
    });
    return (
        <div className="form">
            <h2 className="form__title">Register to ConnectMe</h2>
            <InputGroup
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                handleChange={handleChange}
                label="Please enter your first name"
            />
            <InputGroup
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                handleChange={handleChange}
                label="Please enter your last name"
            />
            <InputGroup
                name="username"
                value={formData.username}
                handleChange={handleChange}
                label="Please enter your desired username"
            />
            <InputGroup
                name="password"
                type="password"
                value={formData.password}
                handleChange={handleChange}
                label="Please enter your desired password"
            />
            <InputGroup
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                handleChange={handleChange}
                label="Please confirm your password"
            />
            <Button click={registerUser} variant="success">
                REGISTER
            </Button>
            <h5 onClick={changeForm} className="form__link">
                Already have an account? Login here
            </h5>
            {dialog && <Dialog {...dialogProps} />}
        </div>
    );
}
