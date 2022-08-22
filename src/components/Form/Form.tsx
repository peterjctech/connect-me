import { Button } from "@components";

interface FormProps {
    title: string;
    children: React.ReactNode;
    submit: () => void;
    submitText?: string;
    linkText?: string;
    linkSubmit?: () => void;
}

const Form = ({ title, children, submit, submitText, linkText, linkSubmit }: FormProps) => {
    return (
        <div className="form">
            <h1 className="form__title">{title}</h1>
            <section>{children}</section>
            <footer>
                <Button click={submit} variant="success">
                    {submitText || "submit"}
                </Button>
                {linkSubmit && (
                    <p onClick={linkSubmit} className="form__link">
                        {linkText}
                    </p>
                )}
            </footer>
        </div>
    );
};

export default Form;
