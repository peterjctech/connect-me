interface ButtonProps {
    click: () => void;
    children: React.ReactNode;
    variant?: string;
}

export default function ({ variant, children, click }: ButtonProps) {
    return (
        <button onClick={click} className={`button ${variant || "primary"}`}>
            {children}
        </button>
    );
}
