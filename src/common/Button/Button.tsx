interface ButtonProps {
    click: () => void;
    children: React.ReactNode;
    type?: "success" | "error" | "warning" | "info" | "help" | "disabled";
    squared?: boolean;
}

const Button = ({ click, children, squared, type }: ButtonProps) => {
    return (
        <button onClick={click} className={`button${squared ? " squared" : ""} ${type ? type : ""}`}>
            {children}
        </button>
    );
};

export default Button;
