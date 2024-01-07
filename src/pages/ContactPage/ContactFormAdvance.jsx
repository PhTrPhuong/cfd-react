import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import validate, { regrexRule, requireRule } from "../../utils/validate";

// Advance - Nâng cao
// C1: rules thông thường
// const rules = {
//     name: [
//         {
//             required: true,
//             message: "Vui lòng nhập tên",
//         },
//     ],
//     email: [
//         {
//             required: true,
//             message: "Vui lòng nhập email",
//         },
//         {
//             // regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//             regrex: "email",
//             message: "Vui lòng nhập đúng định dạng email",
//         },
//     ],
//     phone: [
//         {
//             required: true,
//             message: "Vui lòng điền phone",
//         },
//         {
//             regrex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
//             // regrex: "phone",
//             message: "Vui lòng nhập đúng định dạng phone",
//         },
//     ],
// };
// C2: rules khi được tối ưu lại - dựa vào bên file validate.js
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

const ContactFormAdvance = ({ handleFormSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        topic: "",
        content: "",
    });
    const [error, setError] = useState({});

    // Advance - Nâng cao
    // NOTE: không cần sử dụng function này vì đã được generate ra từ register function
    // const _onChange = (e) => {
    //   const value = e.target.value;
    //   const name = e.target.name;
    //   setForm({ ...form, [name]: value });
    // };
    const register = (registerField) => {
        return {
            name: registerField,
            value: form[registerField],
            error: error[registerField],
            onChange: (e) =>
                setForm({ ...form, [registerField]: e.target.value }),
        };
    };

    const _onSubmit = (event) => {
        event.preventDefault();

        // Start validate - Basic - Cơ bản
        // const errorObject = {};
        // if (!!!form.name) {
        //     errorObject.name = "Vui lòng nhập tên";
        // }
        // if (!!!form.email) {
        //     errorObject.email = "Vui lòng nhập email";
        // } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
        //     errorObject.email = "Vui lòng nhập đúng định dạng email";
        // }
        // if (!!!form.phone) {
        //     errorObject.phone = "Vui lòng nhập phone";
        // } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
        //     errorObject.phone = "Vui lòng nhập đúng định dạng phone";
        // }
        // if (!!!form.topic) {
        //     errorObject.topic = "Vui lòng chọn chủ đề";
        // }
        // if (!!!form.content) {
        //     errorObject.content = "Vui lòng nhập nội dung";
        // }
        // end validate basic

        // Start validate - Advance - Nâng cao
        const errorObject = validate(rules, form);
        // end validate advance

        setError(errorObject);

        // Handle submit
        if (Object.keys(errorObject).length > 0) {
            console.log("Submit error", errorObject);
        } else {
            // call API
            console.log("Submit success", form);
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

                // Advance - Nâng cao
                {...register("name")}
            />

            <Input
                // name="email"
                label="Email"
                required
                placeholder="Email"
                // error={error.email}
                // onChange={_onChange}

                // Advance - Nâng cao
                {...register("email")}
            />

            <Input
                // name="phone"
                label="Số điện thoại"
                required
                placeholder="Số điện thoại"
                // error={error.phone}
                // onChange={_onChange}

                // Advance - Nâng cao
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
                    return (
                        <TextArea
                            // onChange={(e) =>console.log("value content: ", e.target.value) }
                            {...inputProps}
                        />
                    );
                }}
            />

            {/* btn - submit */}
            <div className="btncontrol">
                <Button onClick={_onSubmit}>Gửi</Button>
            </div>
        </div>
    );
};

export default ContactFormAdvance;