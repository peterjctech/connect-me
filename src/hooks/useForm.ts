import { useState } from "react";

const useForm = (obj: Record<string, any>) => {
    const [formData, setFormData] = useState(obj);

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event): void => {
        const { value, name } = event.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    return { formData, handleChange, setFormData };
};

export default useForm;
