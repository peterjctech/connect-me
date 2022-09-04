import { Button } from "@common";

interface FormProps {
    title: string;
    submit: () => void;
    submitText?: string;
    linkText?: string;
    linkSubmit?: () => void;
    className?: string;
    children: React.ReactNode;
}

const Form = ({ title, submit, submitText, linkText, linkSubmit, className, children }: FormProps) => {
    return (
        <div className={`form ${className || ""}`}>
            <h1 className="form__title">{title}</h1>
            <div className="form__content">{children}</div>
            <footer>
                <Button click={submit}>{submitText || "Submit"}</Button>
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
