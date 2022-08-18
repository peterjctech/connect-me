interface InputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
    placeholder?: string;
    label?: string;
    type?: string;
}

const Input = ({ handleChange, name, value, placeholder, label, type }: InputProps) => {
    return (
        <div className="input">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type || "text"}
                name={name}
                placeholder={placeholder || name.charAt(0).toUpperCase() + name.slice(1)}
                autoComplete="off"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default Input;
