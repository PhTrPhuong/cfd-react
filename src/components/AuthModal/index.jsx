import React from "react";
import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ReactDOM from "react-dom";

/* -- Modal Đăng Nhập / Đăng Ký -- */
const AuthModal = () => {
    const { showedModal, handleCloseModal } = useAuthContext();

    // sử dụng createPortal của ReactDOM để render ra HTML ở nơi mình mong muốn
    return ReactDOM.createPortal(
        <div className={`modal modallogin ${showedModal ? "open" : ""}`}>
            <div className="modal__wrapper">
                <div className="modal__wrapper-close" onClick={handleCloseModal}>
                    <img src="/img/close_icon.svg" alt="CFD Register" />
                </div>
                {showedModal === MODAL_TYPES.login && <LoginForm />}
                {showedModal === MODAL_TYPES.register && <RegisterForm />}
            </div>
            <div className="modal__overlay" onClick={handleCloseModal} />
        </div>,
        document.body // Nơi Element sẽ được append
    );
};

export default AuthModal;
