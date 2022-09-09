import { AiOutlineCaretDown } from "react-icons/ai";

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    name: string;
    value: string;
    options: Option[];
    placeholder: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ name, value, options, handleChange, placeholder }: DropdownProps) => {
    return (
        <div className="dropdown">
            <label htmlFor={name}>{placeholder}</label>
            <AiOutlineCaretDown />
            <select name={name} value={value} onChange={handleChange}>
                {options.map((obj) => {
                    return (
                        <option value={obj.value} key={obj.value}>
                            {obj.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Dropdown;
