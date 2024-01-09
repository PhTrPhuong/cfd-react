import { Spin } from "antd";
import React, { useEffect } from "react";

const PageLoading = () => {
    useEffect(() => {
        $(window).on("load", () => {
            $(".loading").addClass("--hide");
        });
    }, []);

    return (
        <div className="loading">
            <Spin />
        </div>
    );
};

export default PageLoading;
