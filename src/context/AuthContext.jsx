import PATHS from "@/constants/path";
import { authService } from "@/services/authService";
import { orderService } from "@/services/orderService";
import tokenMethod, { localToken } from "@/utils/token";
import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* -- Tạo context api -- */
const AuthContext = createContext({});

/* -- Tạo context provider - để bao toàn bộ ứng dụng -- */
const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    /* Tạo state showedModal lưu trữ modalType */
    const [showedModal, setShowedModal] = useState(""); // register || login || ""
    // console.log("showedModal", showedModal);

    /* ---- */
    const [profile, setProfile] = useState({});
    const [courseInfo, setCourseInfo] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState([]);

    /* ---- */
    useEffect(() => {
        const accessToken = tokenMethod.get()?.accessToken;
        if (!!accessToken) {
            handleGetProfile();
            handleGetProfileCourse();
            handleGetProfilePayment();
        }
    }, []);

    /* Handle Show Modal */
    const handleShowModal = (modalType) => {
        setShowedModal(modalType || "");
    };
    const handleCloseModal = (e) => {
        e?.stopPropagation();
        setShowedModal("");
    };

    /* Authentication API flow - Login api */
    const handleLogin = async (loginData, callback) => {
        // Xử lí payload
        const payload = { ...loginData };

        // Xử lí api login
        try {
            const res = await authService.login(payload);
            console.log("res", res);
            if (res?.data?.data) {
                const { token: accessToken, refreshToken } = res.data.data || {};
                /* Lưu token trong: localStorage || Cookie */
                tokenMethod.set({ accessToken, refreshToken });
                // localStorage.setItem("token", JSON.stringify({accessToken, refreshToken}));
                /* Lấy thông tin profile */
                handleGetProfile();
                /* Đóng modal & thông báo thành công */
                handleCloseModal();
                message.success("Đăng nhập thành công!");
            } else {
                message.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            callback?.();
        }
    };

    /* Authentication API flow - Register api */
    const handleRegister = async (registerData, callback) => {
        const { name, email, password } = registerData || {};
        // Xử lí payload
        const payload = {
            firstName: name,
            lastName: "",
            email,
            password,
        };
        console.log("payload", payload);

        // Xử lí api register
        try {
            const res = await authService.register(payload);
            if (res?.data?.data?.id) {
                // Success => login
                handleLogin({ email, password });
                // Thông báo
                message.success("Đăng ký thành công!");
            } else {
                message.error("Đăng ký thất bại!");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            callback?.();
        }
    };

    /* Handle Logout */
    const handleLogout = () => {
        tokenMethod.remove();
        navigate(PATHS.HOME);
        message.success("Tài khoản đã đăng xuất");
    };

    /* Get profile */
    const handleGetProfile = async () => {
        // call api
        try {
            const res = await authService.getProfile();
            // console.log("res", res);
            if (res?.data?.data) {
                setProfile(res.data.data);
            }
        } catch (error) {
            console.log("error", error);
            handleLogout();
        }
    };

    /* Get profile Course */
    const handleGetProfileCourse = async () => {
        try {
            const res = await orderService.getCourseHistories();
            const orderedCourses = res?.data?.data?.orders || [];
            setCourseInfo(orderedCourses);
        } catch (error) {
            console.log("getCourseHistories error", error);
        }
    };

    /* Get profile Payment */
    const handleGetProfilePayment = async () => {
        try {
            const res = await orderService.getPaymentHistories();
            const payments = res?.data?.data?.orders || [];
            setPaymentInfo(payments);
        } catch (error) {
            console.log("getPaymentHistories error", error);
        }
    };

    /* Handle Update Profile */
    const handleUpdateProfile = async (profileData) => {
        try {
            const { firstName, email, password, facebookURL, introduce, phone, website } =
                profileData;

            const payload = {
                firstName,
                lastName: "",
                email,
                password,
                facebookURL,
                website,
                introduce,
                phone,
            };
            const res = await authService.updateProfile(payload);
            if (res?.data?.data?.id) {
                message.success("Cập nhật thông tin thành công");
                handleGetProfile();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                showedModal,
                handleShowModal,
                handleCloseModal,
                handleLogin,
                handleRegister,
                handleLogout,
                profile,
                courseInfo,
                paymentInfo,
                handleGetProfileCourse,
                handleGetProfilePayment,
                handleUpdateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

/* -- Tạo useContext -- */
export const useAuthContext = () => useContext(AuthContext);
