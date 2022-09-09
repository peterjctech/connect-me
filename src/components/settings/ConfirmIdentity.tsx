import { Modal, Form, Input } from "@common";
import { usePassword } from "@hooks";

interface ConfirmIdentityProps {
    closeModal: () => void;
    finishForm: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    oldPassword: string;
}

const ConfirmIdentity = ({ closeModal, finishForm, handleChange, oldPassword }: ConfirmIdentityProps) => {
    const { showPassword, updateShowPassword } = usePassword();

    return (
        <Modal closeModal={closeModal}>
            <Form title="Please verify your identity" submit={{ func: finishForm }}>
                <Input
                    name="old_password"
                    type={showPassword.main.show ? "text" : "password"}
                    value={oldPassword}
                    handleChange={handleChange}
                    placeholder="Current Password"
                    icon={{
                        SVG: <showPassword.main.icon onClick={() => updateShowPassword("main")} />,
                        position: "right",
                    }}
                />
            </Form>
        </Modal>
    );
};

export default ConfirmIdentity;
