interface InputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
}

const Input = ({ handleChange, name, type, placeholder, value, label }: InputProps) => {
    function capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return (
        <div className="input">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type || "text"}
                name={name}
                placeholder={placeholder || capitalize(name)}
                autoComplete="off"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default Input;
