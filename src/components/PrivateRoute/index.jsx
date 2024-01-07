import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import tokenMethod from "@/utils/token";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "" }) => {
    const navigate = useNavigate();
    const { handleShowModal } = useAuthContext();

    useEffect(() => {
        if (!!!tokenMethod.get()) {
            handleShowModal?.(MODAL_TYPES.login);
        }
    }, [handleShowModal]);

    if (!!!tokenMethod.get()) {
        if (redirectPath) {
            return <Navigate to={redirectPath} />;
        } else {
            navigate(-1); // về lại trang trước đó
        }
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateRoute;
