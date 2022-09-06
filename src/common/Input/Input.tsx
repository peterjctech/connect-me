interface InputProps {
    name: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: {
        SVG: React.ReactElement;
        position: "left" | "right";
    };
    placeholder: string;
    noLabel?: boolean;
    type?: string;
}

const Input = ({ placeholder, name, type, value, handleChange, icon, noLabel }: InputProps) => {
    return (
        <div className={`input icon--${icon ? icon.position : "none"}`}>
            {!noLabel && <label htmlFor={name}>{placeholder}</label>}
            {icon && icon.SVG}
            <input
                value={value}
                name={name}
                type={type || "text"}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck="false"
                onChange={handleChange}
            />
        </div>
    );
};

export default Input;
