import { regrexRule, requireRule } from "@/utils/validate";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import useForm from "@/hooks/useForm";
import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import ComponentLoading from "../ComponentLoading";
import { message } from "antd";

const rules = {
    email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
    ],
    password: [requireRule("Vui lòng nhập mật khẩu")],
};

const LoginForm = () => {
    const { handleShowModal, handleLogin } = useAuthContext();

    /* -- Xư lí component loading -- */
    const [loading, setLoading] = useState(false);

    /* -- Xư lí để link tới trang register -- */
    const _onRegisterClick = (e) => {
        e.stopPropagation();
        handleShowModal(MODAL_TYPES.register);
    };

    /* -- Xư lí form Login -- */
    const { form, register, validate } = useForm(
        {
            email: "",
            password: "",
        },
        rules
    );
    const _onSubmit = (event) => {
        event.preventDefault();
        // Start validate
        const errorObject = validate();
        // Handle submit
        if (Object.keys(errorObject).length > 0) {
            console.log("Submit error: ", errorObject);
        } else {
            // call API
            setLoading(true);
            console.log("Submit success: ", form);
            handleLogin?.(form, () => {
                setTimeout(() => {
                    setLoading(false);
                    // message.success("Đăng nhập thành công !");
                }, 300);
            });
        }
    };

    return (
        <div
            className="modal__wrapper-content mdlogin active"
            style={{ position: "relative" }}
        >
            {loading && <ComponentLoading />}

            <div className="form__bottom">
                <p>Bạn chưa có tài khoản?</p>
                <div
                    className="color--primary btnmodal"
                    data-modal="mdregister"
                    onClick={_onRegisterClick}
                >
                    <strong>Đăng ký</strong>
                </div>
            </div>
            <form onClick={_onSubmit} className="form">
                <Input
                    label="Email"
                    placeholder="nhập email"
                    required
                    {...register("email")}
                />
                <Input
                    label="Password"
                    placeholder="nhập password"
                    required
                    type="password"
                    {...register("password")}
                />

                <Button className="form__btn-register" type="submit">
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
