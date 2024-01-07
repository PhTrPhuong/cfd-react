import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";

const ContactFormBasic = ({ handleFormSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        topic: "",
        content: "",
    });
    const [error, setError] = useState({});

    const _onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({ ...form, [name]: value });
    };

    const _onSubmit = (event) => {
        event.preventDefault();

        // Start validate
        const errorObject = {};

        if (!!!form.name) {
            errorObject.name = "Vui lòng nhập tên";
        }

        if (!!!form.email) {
            errorObject.email = "Vui lòng nhập email";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            errorObject.email = "Vui lòng nhập đúng định dạng email";
        }

        if (!!!form.phone) {
            errorObject.phone = "Vui lòng nhập phone";
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
            errorObject.phone = "Vui lòng nhập đúng định dạng phone";
        }

        if (!!!form.topic) {
            errorObject.topic = "Vui lòng chọn chủ đề";
        }

        if (!!!form.content) {
            errorObject.content = "Vui lòng nhập nội dung";
        }
        // end validate
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

            {/* -Input Họ và tên- */}
            {/* <div className="form-group">
                <label className="label"> Họ và tên <span>*</span></label>
                <input defaultValue type="text" className="form__input formerror" />
                <p className="error">Họ và tên không được để trống</p>
            </div> */}
            <Input
                name="name"
                label="Họ và tên"
                required
                placeholder="Họ và tên"
                error={error.name}
                onChange={_onChange}
            />

            {/* -Input Email- */}
            {/* <div className="form-group">
                <label className="label"> Email <span>*</span></label>
                <input defaultValue type="text" className="form__input" />
            </div> */}
            <Input
                name="email"
                label="Email"
                required
                placeholder="Email"
                error={error.email}
                onChange={_onChange}
            />

            {/* -Input Phone- */}
            {/* <div className="form-group">
                <label className="label"> Số điện thoại <span>*</span></label>
                <input defaultValue type="text" className="form__input" />
            </div> */}
            <Input
                name="phone"
                label="Số điện thoại"
                required
                placeholder="Số điện thoại"
                error={error.phone}
                onChange={_onChange}
            />

            {/* -Input - Select - Topic- */}
            {/* <div className="form-group">
                <label className="label">Chủ đề cần hỗ trợ <span>*</span></label>
                <div className="select">
                    <div className="head form__input">--</div>
                    <div className="sub">
                        <a href="#">Web Responsive</a>
                        <a href="#">React &amp; Redux</a>
                    </div>
                </div>
            </div> */}
            {/* <div className="form-group">
                <label className="label">Chủ đề cần hỗ trợ <span>*</span></label>
                <Select
                    onChange={(e) => console.log("value topic: ", e.target.value)}
                    options={[
                        { value: "", label: "--" },
                        { value: "react", label: "ReactJS" },
                        { value: "responsive", label: "Web Responsive" },
                    ]}
                />
            </div> */}
            <Input
                name="topic"
                label="Chủ đề cần hỗ trợ"
                required
                value={form.topic}
                error={error.topic}
                onChange={_onChange}
                renderInput={(inputProps) => {
                    return (
                        <Select
                            // onChange={(e) =>console.log("value topic: ", e.target.value) }
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

            {/* -Input - TextArea - Content- */}
            {/* <div className="form-group">
                <label className="label">Nội dung <span>*</span></label>
                <textarea className="form__input" defaultValue={""} />
            </div> */}
            <Input
                name="content"
                label="Nội dung"
                placeholder="Nội dung..."
                required
                value={form.content}
                error={error.content}
                onChange={_onChange}
                renderInput={(inputProps) => {
                    return (
                        <TextArea
                            // onChange={(e) =>console.log("value content: ", e.target.value) }
                            {...inputProps}
                        />
                    );
                }}
            />

            {/* btn submit */}
            <div className="btncontrol">
                {/* <button className="btn btn--primary" onClick={_onSubmit}>Gửi</button> */}
                <Button onClick={_onSubmit}>Gửi</Button>
            </div>
        </div>
    );
};

export default ContactFormBasic;
