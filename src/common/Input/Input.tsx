interface InputProps {
    name: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactElement;
    placeholder: string;
    noLabel?: boolean;
    type?: string;
}

const Input = ({ placeholder, name, type, value, handleChange, icon, noLabel }: InputProps) => {
    return (
        <div className="input">
            {!noLabel && <label htmlFor={name}>{placeholder}</label>}
            {icon && icon}
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
