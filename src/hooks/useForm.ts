import React, { useState } from "react";

export default function (obj: Record<string, any>) {
    const [formData, setFormData] = useState(obj);
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
        const { value, name } = event.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    return { formData, handleChange };
}
