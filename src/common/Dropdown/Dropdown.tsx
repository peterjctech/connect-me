import { AiOutlineCaretDown } from "react-icons/ai";

interface DropdownProps {
    name: string;
    value: string;
    options: { label: string | number; value: string | number }[];
    placeholder: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ name, value, options, placeholder, handleChange }: DropdownProps) => {
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
