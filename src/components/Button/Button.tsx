interface ButtonProps {
    click: () => void;
    children: React.ReactNode;
    variant?: string;
}

const Button = ({ variant, children, click }: ButtonProps) => {
    return (
        <button onClick={click} className={`button ${variant || "primary"}`}>
            {children}
        </button>
    );
};

export default Button;
