import React, { useState } from "react";
import validate from "../utils/validate";

const useForm = (initialValue, rules) => {
    const [form, setForm] = useState(initialValue);
    const [error, setError] = useState({});

    const register = (registerField) => {
        return {
            name: registerField,
            value: form[registerField],
            error: error[registerField],
            onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
        };
    };

    const _validate = () => {
        const errorObject = validate(rules, form);
        setError(errorObject);
        return errorObject;
    };

    return {
        form,
        error,
        register,
        validate: _validate,
        setForm,
    };
};

export default useForm;
