interface InputGroupProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
}

export default function ({ handleChange, name, type, placeholder, value, label }: InputGroupProps) {
    function capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
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
}
