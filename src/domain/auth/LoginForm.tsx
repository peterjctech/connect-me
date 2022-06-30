import { Button, InputGroup } from "@components";
import { useForm, useHotkey } from "@hooks";

interface LoginFormProps {
    changeForm: () => void;
}

export default function ({ changeForm }: LoginFormProps) {
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
    });

    const loginUser = () => {
        console.log("Logging in => ", formData);
    };

    useHotkey({
        code: "Enter",
        callback: loginUser,
    });
    return (
        <div className="form">
            <h2 className="form__title">Login to ConnectMe</h2>
            <InputGroup
                name="username"
                value={formData.username}
                handleChange={handleChange}
                label="Please enter your username"
            />
            <InputGroup
                name="password"
                type="password"
                value={formData.password}
                handleChange={handleChange}
                label="Please enter your password"
            />
            <Button click={loginUser} variant="success">
                LOGIN
            </Button>
            <h5 onClick={changeForm} className="form__link">
                Don't have an account? Register here
            </h5>
        </div>
    );
}
