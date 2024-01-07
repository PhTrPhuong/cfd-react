import { MainContext, useMainContext } from "@/context/MainContext";
import React, { useContext } from "react";

const Overlay = () => {
    /* dùng useContext để lấy về data, state hoặc function cần sử dụng */
    // const { handleShowNavbar } = useContext(MainContext);
    const { handleShowNavbar } = useMainContext();

    return <div className="overlay" onClick={() => handleShowNavbar(false)} />;
};

export default Overlay;
