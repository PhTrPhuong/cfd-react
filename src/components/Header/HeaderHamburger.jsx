import { MainContext } from "@/context/MainContext";
import React, { useContext, useEffect } from "react";

const HeaderHamburger = () => {
    /* dùng useContext để lấy về data, state hoặc function cần sử dụng */
    const { isShowNavbar, handleShowNavbar } = useContext(MainContext);

    useEffect(() => {
        if (isShowNavbar) {
            $("body").addClass("menu-show");
        } else {
            $("body").removeClass("menu-show");
        }
    }, [isShowNavbar]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        handleShowNavbar?.(!isShowNavbar);
    };

    return (
        <div
            className={`header__humburger ${!!isShowNavbar ? "--close" : ""}`}
            onClick={toggleMenu}
        >
            <div className="header__humburger-button">
                <span />
                <span />
                <span />
            </div>
            <div className="header__humburger-text">
                {<span>{!!isShowNavbar ? "Đóng" : "Mở"}</span>}
                {/* 
                    <span>Menu</span>
                    <span>Đóng</span> 
                */}
            </div>
        </div>
    );
};

export default HeaderHamburger;
