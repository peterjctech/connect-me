interface ButtonProps {
    click: () => void;
    children: React.ReactNode;
}

const Button = ({ click, children }: ButtonProps) => {
    return (
        <button onClick={click} className="button">
            {children}
        </button>
    );
};

export default Button;
