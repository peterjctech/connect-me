import { Button } from "common";

interface FormProps {
    title: string;
    submit: {
        func: () => void;
        text?: string;
    };
    children: React.ReactNode;
    link?: {
        text: string;
        func: () => void;
    };
}

const Form = ({ title, submit, children, link }: FormProps) => {
    return (
        <div className="form">
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
