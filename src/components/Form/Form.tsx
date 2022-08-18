import { Button } from "@components";

interface FormProps {
    title: string;
    children: React.ReactNode;
    submit: () => void;
    submitText?: string;
}

const Form = ({ title, children, submit, submitText }: FormProps) => {
    return (
        <div className="form">
            <h1 className="form__title">{title}</h1>
            <section>{children}</section>
            <footer>
                <Button click={submit} variant="success">
                    {submitText || "submit"}
                </Button>
            </footer>
        </div>
    );
};

export default Form;
