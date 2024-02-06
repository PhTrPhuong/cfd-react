import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import validate, { regrexRule, requireRule } from "../../utils/validate";
import useForm from "@/hooks/useForm";

// Advance - Nâng cao
const rules = {
    name: [requireRule("Vui lòng nhập tên")],
    email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
    ],
    phone: [
        requireRule("Vui lòng nhập phone"),
        // regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
        regrexRule(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            "Vui lòng nhập đúng định dạng phone"
        ),
    ],
    topic: [requireRule("Vui lòng nhập topic")],
    content: [requireRule()],
};

const ContactForm = ({ handleFormSubmit }) => {
    const { form, error, setError, register, validate } = useForm(
        {
            name: "",
            email: "",
            phone: "",
            topic: "",
            content: "",
        },
        rules
    );

    const _onSubmit = (event) => {
        event.preventDefault();

        // Start validate - Advance
        const errorObject = validate();
        // end validate advance

        // Handle submit
        if (Object.keys(errorObject).length > 0) {
            console.log("Submit error: ", errorObject);
        } else {
            // call API
            console.log("Submit success: ", form);
            handleFormSubmit?.(form);
        }
    };

    return (
        <div className="form">
            <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
            <Input
                // name="name"
                label="Họ và tên"
                required
                placeholder="Họ và tên"
                // error={error.name}
                // onChange={_onChange}
                {...register("name")}
            />

            <Input
                // name="email"
                label="Email"
                required
                placeholder="Email"
                // error={error.email}
                // onChange={_onChange}
                {...register("email")}
            />

            <Input
                // name="phone"
                label="Số điện thoại"
                required
                placeholder="Số điện thoại"
                // error={error.phone}
                // onChange={_onChange}
                {...register("phone")}
            />

            <Input
                // name="topic"
                label="Chủ đề cần hỗ trợ"
                required
                // value={form.topic}
                // error={error.topic}
                // onChange={_onChange}
                {...register("topic")}
                renderInput={(inputProps) => {
                    return (
                        <Select
                            options={[
                                { value: "", label: "--" },
                                { value: "react", label: "ReactJS" },
                                {
                                    value: "responsive",
                                    label: "Web Responsive",
                                },
                            ]}
                            {...inputProps}
                        />
                    );
                }}
            />

            <Input
                // name="content"
                label="Nội dung"
                placeholder="Nội dung..."
                required
                // value={form.content}
                // error={error.content}
                // onChange={_onChange}
                {...register("content")}
                renderInput={(inputProps) => {
                    return <TextArea {...inputProps} />;
                }}
            />

            {/* btn - submit */}
            <div className="btncontrol">
                <Button onClick={_onSubmit}>Gửi</Button>
            </div>
        </div>
    );
};

export default ContactForm;
