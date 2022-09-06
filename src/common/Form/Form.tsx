import { Button } from "@common";

interface FormProps {
    title: string;
    submit: {
        func: () => void;
        text?: string;
    };
    link?: {
        text: string;
        func: () => void;
    };
    className?: string;
    children: React.ReactNode;
}

const Form = ({ title, submit, link, className, children }: FormProps) => {
    return (
        <div className={`form ${className || ""}`}>
            <h1 className="form__title">{title}</h1>
            <div className="form__content">{children}</div>
            <footer>
                <Button click={submit.func}>{submit.text || "Submit"}</Button>
                {link && (
                    <p onClick={link.func} className="form__link">
                        {link.text}
                    </p>
                )}
            </footer>
        </div>
    );
};

export default Form;
