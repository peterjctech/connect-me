import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    name: string;
    value: string;
    // handleChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    handleChange: (props: { name: string; value: string }) => void;
    options: Option[];
    placeholder: string;
    icon?: React.ReactElement;
}

const Dropdown = ({ name, value, handleChange, options, placeholder, icon }: DropdownProps) => {
    const [show, setShow] = useState(false);

    const test = () => {
        console.log("test");
    };

    return (
        <div className={`dropdown${show ? "" : " hidden"}`}>
            {icon && icon}
            <label>{placeholder}</label>
            <input
                defaultValue={value}
                name={name}
                type="text"
                placeholder={placeholder}
                autoComplete="off"
                spellCheck="false"
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
            />
            <AiOutlineCaretDown />
            <div className="dropdown__options">
                {show &&
                    options.map((obj) => {
                        return (
                            <h6
                                onClick={() => handleChange({ name, value: obj.value })}
                                className="dropdown__option"
                                key={obj.value}
                            >
                                {obj.label}
                            </h6>
                        );
                    })}
            </div>
        </div>
        // <div onFocus={test} onBlur={() => setShow(false)} className={`dropdown${show ? "" : " hidden"}`}>
        //     <h6 className="dropdown__label">{placeholder}</h6>
        //     <h6 className="dropdown__selection">{value}</h6>
        //     <div className="dropdown__menu">
        //         {options.map((obj) => {
        //             const test = { name, value: obj.value };
        //             return (
        //                 <div onClick={() => handleChange(test)} key={obj.value}>
        //                     <h6 className="dropdown__option">{obj.label}</h6>
        //                 </div>
        //             );
        //         })}
        //     </div>
        //     <AiOutlineCaretDown />
        // </div>
    );
};

export default Dropdown;
