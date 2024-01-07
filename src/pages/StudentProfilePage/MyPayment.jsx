import CoursePaymentItem from "@/components/CoursePaymentItem";
import { useAuthContext } from "@/context/AuthContext";
import { Empty } from "antd";
import React from "react";

const MyPayment = () => {
    const { paymentInfo } = useAuthContext();

    return (
        <div className="tab__content-item" style={{ display: "block" }}>
            {/* -- Case: No data -- */}
            {!!!paymentInfo.length && (
                <Empty
                    description="Không tìm thấy dữ liệu nào"
                    style={{ margin: "0 auto" }}
                />
            )}

            {/* -- Case: data -- */}
            {!!paymentInfo.length &&
                paymentInfo.map((item, index) => (
                    <CoursePaymentItem
                        key={item.id || new Date().getTime() + index}
                        {...item}
                    />
                ))}
        </div>

        // <div className="tab__content-item" style={{ display: "block" }}>
        //     <div className="itemhistory">
        //         <div className="name">Frontend Newbie</div>
        //         <div className="payment">Chuyển khoản</div>
        //         <div className="date">05/01/2022</div>
        //         <div className="money">4.500.000 VND</div>
        //     </div>
        //     <div className="itemhistory">
        //         <div className="name">Web Responsive</div>
        //         <div className="payment">Tiền mặt</div>
        //         <div className="date">14/07/2022</div>
        //         <div className="money">4.900.000 VND</div>
        //     </div>
        // </div>
    );
};

export default MyPayment;
