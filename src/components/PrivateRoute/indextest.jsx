import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import tokenMethod from "@/utils/token";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/" }) => {
    const { handleShowModal } = useAuthContext();

    // const navigate = useNavigate();
    // if (!!!tokenMethod.get()) {
    //     handleShowModal?.(MODAL_TYPES.login);
    //     if (redirectPath) {
    //         return <Navigate to={redirectPath} />;
    //     } else {
    //         // về lại trang trước đó
    //         navigate(-1);
    //     }
    // }

    if (!!!tokenMethod.get()) {
        handleShowModal?.(MODAL_TYPES.login);
        if (redirectPath) {
            return <Navigate to={redirectPath} />;
        }
    }
    // file App.jsx có redirectPath
    // <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>

    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateRoute;
