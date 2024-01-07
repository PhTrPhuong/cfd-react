import React from "react";

const Select = ({ options, error, ...restProps }) => {
    return (
        <select
            className={`select form__input ${error ? "formerror" : ""}`}
            {...restProps}
        >
            {options?.map(({ value, label }, index) => {
                return (
                    <option key={value || index} value={value}>
                        {label || ""}
                    </option>
                );
            })}
            {/* {options?.map((option, index) => (
                <option key={option?.value || index} value={option?.value}>
                    {option?.label || ""}
                </option>
            ))} */}
        </select>
    );
};

export default Select;
