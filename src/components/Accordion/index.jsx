import { Empty } from "antd";
import React, { useState } from "react";

/* -- Tạo component Accordion: nhận vào props label và data, từ đó render tương ứng -- */
const Accordion = ({ label = "", data = [], defaultActiveIndex = -1 }) => {
    /* Ứng dụng State để lưu trữ activeIndex mỗi khi Accordion Item được click. 
            Sau đó so sánh index và điều chỉnh class active */
    const [activeId, setActiveId] = useState(defaultActiveIndex);

    // const [activeId, setActiveId] = useState("");
    // const _onTitleClick = (e, id) => {
    //     e.stopPropagation();
    //     // if (id !== activeId) {
    //     //     setActiveId(id);
    //     // } else {
    //     //     setActiveId("");
    //     // }
    //     setActiveId(id !== activeId ? id : "");
    // };

    return (
        <div className="accordion">
            <h3 className="accordion__title label">{!!label && label}</h3>

            {data?.length > 0 ? (
                data.map((item, index) => {
                    const { id, title, content } = item || {};
                    return (
                        <div
                            key={id || index}
                            className={`accordion__content ${
                                activeId === index ? "active" : ""
                            }`}
                        >
                            <div
                                className="accordion__content-title"
                                // onClick={(e) => _onTitleClick(e, id)}
                                onClick={() =>
                                    setActiveId(index === activeId ? -1 : index)
                                }
                            >
                                <h4>
                                    <strong>{title || ""}</strong>
                                </h4>
                            </div>
                            <div className="accordion__content-text">{content || ""}</div>
                        </div>
                    );
                })
            ) : (
                <Empty
                    description="Không có nội dung hiển thị"
                    style={{ margin: "0 auto" }}
                />
            )}
        </div>
    );
};

export default Accordion;
