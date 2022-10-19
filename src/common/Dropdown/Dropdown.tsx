import { AiOutlineCaretDown } from "react-icons/ai";

interface DropdownProps {
    name: string;
    value: string;
    options: { label: string | number; value: string | number }[];
    placeholder: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ name, value, options, placeholder, handleChange }: DropdownProps) => {
    const menu = options.map((option) => {
        return (
            <option value={option.value} key={option.value}>
                {option.label}
            </option>
        );
    });

    return (
        <div className="dropdown">
            <label htmlFor={name}>{placeholder}</label>
            <AiOutlineCaretDown />
            <select name={name} value={value} onChange={handleChange}>
                {menu}
            </select>
        </div>
    );
};

export default Dropdown;
