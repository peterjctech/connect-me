interface InputProps {
    name: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    noLabel?: boolean;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    label?: string;
    minmax?: [number, number];
}

const Input = ({
    name,
    value,
    handleChange,
    type,
    noLabel,
    placeholder,
    iconLeft,
    iconRight,
    minmax,
    label,
}: InputProps) => {
    let componentClass = "input";
    if (!iconLeft && !iconRight) componentClass = "input no-icon";
    return (
        <div className={componentClass}>
            {!noLabel && <label htmlFor={name}>{label || placeholder}</label>}
            {iconLeft && <div className="i--left">{iconLeft}</div>}
            {iconRight && <div className="i--right">{iconRight}</div>}
            <input
                name={name}
                value={value}
                type={type || "text"}
                onChange={handleChange}
                placeholder={placeholder}
                spellCheck="false"
                min={minmax && minmax[0]}
                max={minmax && minmax[1]}
                autoComplete="off"
            />
        </div>
    );
};

export default Input;
