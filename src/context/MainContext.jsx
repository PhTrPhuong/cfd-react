import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/* -- Tạo context api -- */
export const MainContext = createContext({});

/* -- Tạo context provider - để bao toàn bộ ứng dụng -- */
export const MainContextProvider = ({ children }) => {
    const { pathname } = useLocation();

    /* -- Xử lí data cần truyền -- */
    const [isShowNavbar, setIsShowNavbar] = useState(false);

    // khi pathname thay đổi thì, navbar ẩn & scrolltotop
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setIsShowNavbar(false);
    }, [pathname]);

    const handleShowNavbar = (isShow) => {
        setIsShowNavbar(isShow);
    };

    return (
        <MainContext.Provider value={{ isShowNavbar, handleShowNavbar }}>
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext);
