import { MainContextProvider } from "@/context/MainContext";
import AuthModal from "../../components/AuthModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Overlay from "../../components/Overlay";
import PageLoading from "../../components/PageLoading";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "@/context/AuthContext";

const MainLayout = ({ children }) => {
    return (
        /*--  dùng MainContextProvider để bao bọc các children ở MainLayout --*/
        <MainContextProvider>
            <AuthContextProvider>
                {/* <PageLoading /> */}
                <Header />
                <Navbar />
                <Overlay />

                {/* --Pages-- */}
                <Outlet />
                {/* {children} */}

                <Footer />
                {/* --Modal Đăng Nhập / Đăng Ký-- */}
                <AuthModal />
            </AuthContextProvider>
        </MainContextProvider>
    );
};

export default MainLayout;
