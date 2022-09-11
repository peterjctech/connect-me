interface ButtonProps {
    click: () => void;
    children: React.ReactNode;
    squared?: boolean;
}

const Button = ({ click, children, squared }: ButtonProps) => {
    return (
        <button onClick={click} className={`button${squared ? " squared" : ""}`}>
            {children}
        </button>
    );
};

export default Button;
