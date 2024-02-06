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
    );
};

export default MyPayment;
