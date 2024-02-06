import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import useForm from "@/hooks/useForm";
import { regrexRule, requireRule } from "@/utils/validate";
import React, { useState } from "react";
import Input from "../Input";
import { Link } from "react-router-dom";
import PATHS from "@/constants/path";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";

const rules = {
    name: [requireRule("Vui lòng nhập họ và tên")],
    email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
    ],
    password: [
        requireRule("Vui lòng nhập mật khẩu"),
        regrexRule("password", "Tối thiểu sáu ký tự, ít nhất một chữ cái và một số"),
    ],
    confirmPassword: [
        requireRule("Vui lòng xác nhận mật khẩu"),
        (value, values, errors) => {
            if (values.password && value !== values.password && !errors.password) {
                return "Mật khẩu xác nhận không đúng";
            }
            return false;
        },
    ],
};

const RegisterForm = () => {
    const { handleShowModal, handleCloseModal, handleRegister } = useAuthContext();

    /* -- Xư lí component loading -- */
    const [loading, setLoading] = useState(false);

    /* -- Xư lí để link tới trang login -- */
    const _onRegisterClick = (e) => {
        e.stopPropagation();
        handleShowModal(MODAL_TYPES.login);
    };

    /* -- Xư lí form register -- */
    const { form, register, validate } = useForm(
        {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        rules
    );
    const _onSubmit = (event) => {
        event.preventDefault();
        // Validate
        const errorObject = validate();
        // Handle submit
        if (Object.keys(errorObject).length > 0) {
            console.log("Submit error: ", errorObject);
        } else {
            // call API
            setLoading(true);
            console.log("Submit success: ", form);
            if (typeof handleRegister === "function") {
                handleRegister?.(form, () => {
                    setTimeout(() => {
                        setLoading(false);
                        // message.success("Đăng ký thành công !");
                    }, 300);
                });
            } else {
                setLoading(false);
            }
        }
    };

    return (
        <div
            className="modal__wrapper-content mdregister active"
            style={{ position: "relative" }}
        >
            {loading && <ComponentLoading />}

            <div className="form__bottom">
                <p>Bạn đã có tài khoản?</p>
                <div
                    className="color--primary btnmodal"
                    data-modal="mdlogin"
                    onClick={_onRegisterClick}
                >
                    <strong>Đăng nhập</strong>
                </div>
            </div>
            <form onClick={_onSubmit} className="form">
                <Input
                    label="Họ và tên"
                    placeholder="Họ và tên"
                    required
                    {...register("name")}
                />
                <Input
                    label="Email"
                    placeholder="Email"
                    required
                    {...register("email")}
                />
                <Input
                    label="Mật khẩu"
                    placeholder="Mật khẩu"
                    required
                    type="password"
                    {...register("password")}
                />
                <Input
                    label="Xác nhận mật khẩu"
                    placeholder="Xác nhận mật khẩu"
                    required
                    type="password"
                    {...register("confirmPassword")}
                />

                <p className="form__argee">
                    Với việc đăng ký, bạn đã đồng ý
                    <Link
                        className="color--primary"
                        to={PATHS.PRIVACY}
                        onClick={handleCloseModal}
                    >
                        Chính Sách Điều Khoản
                    </Link>{" "}
                    của CFD
                </p>

                <Button className="form__btn-register" type="submit">
                    Đăng ký tài khoản
                </Button>
            </form>
        </div>
    );
};

export default RegisterForm;
