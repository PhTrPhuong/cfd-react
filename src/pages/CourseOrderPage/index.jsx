import React, { useEffect, useRef, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import Button from "@/components/Button";
import useMutation from "@/hooks/useMutation";
import { courseService } from "@/services/courseService";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import { ROLES } from "@/constants/roles";
import { useAuthContext } from "@/context/AuthContext";
import { message } from "antd";
import { orderService } from "@/services/orderService";
import PATHS from "@/constants/path";

const CourseOrderPage = () => {
    const formRef = useRef({});
    const navigate = useNavigate();

    const { profile, courseInfo, handleGetProfileCourse, handleGetProfilePayment } =
        useAuthContext();

    /* -- call API - axios -- */
    const { courseSlug } = useParams();
    const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
        courseService.getCourseBySlug
    );
    const { loading: orderLoading, execute: orderCourse } = useMutation(
        orderService.orderCourse
    );

    /* -- useEffect: mỗi khi courseSlug thay đổi sẽ chạy executeCourseDetail để gọi API -- */
    useEffect(() => {
        if (courseSlug) executeCourseDetail?.(courseSlug, {});
    }, [courseSlug]);

    /* -- Modify render data -- */
    const { teams, price, tags } = courseDetailData || {};
    /* -- child props -- */
    const InfoOrderProps = {
        ...courseDetailData,
        teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)) || {},
        price: formatCurrency(price),
    };

    /* -- Xử lý ngăn chặn khoá học đã đăng ký -- */
    const isAlreadyOrder =
        courseInfo?.some((item) => item?.course?.slug === courseSlug) || false;

    /* -- HANDLE paymentMethod change -- */
    const [paymentMethod, setPaymentMethod] = useState("");
    const handlePaymentMethodChange = (payment) => {
        setPaymentMethod(payment);
    };

    /* -- RESET payment, set initialValue payment-- */
    const orderedCourse = courseInfo?.find((item) => item?.course?.slug === courseSlug);
    useEffect(() => {
        if (isAlreadyOrder && courseInfo?.length > 0) {
            setPaymentMethod(orderedCourse.paymentMethod);
        }
    }, [orderedCourse]);

    /* -- HANDLE when user click order this course -- */
    const _onOrder = () => {
        const validate = formRef?.current?.validate;
        const form = formRef?.current?.form;

        const profileError = validate();
        if (Object.keys(profileError).length > 0) {
            console.log("Profile form validate failed", profileError);
        } else {
            if (paymentMethod) {
                // setup payload
                const payload = {
                    name: form?.name,
                    phone: form?.phone,
                    course: courseDetailData?.id,
                    type: form.type,
                    paymentMethod,
                };
                console.log("payload", payload);
                // call api order
                orderCourse(payload, {
                    onSuccess: async () => {
                        message.success("Đăng ký thành công!");
                        await handleGetProfileCourse();
                        await handleGetProfilePayment();
                        navigate(PATHS.PROFILE.MY_COURSE);
                    },
                    onFail: () => {
                        message.error("Đăng ký thất bại!");
                    },
                });
            } else {
                message.error("Vui lòng chọn hình thức thanh toán");
            }
        }
    };

    return (
        <main className="mainwrapper --ptop">
            <section className="sccourseorder">
                <div className="container small">
                    <InfoOrder {...InfoOrderProps} />
                    <FormOrder
                        profile={profile}
                        courseInfo={courseInfo}
                        courseSlug={courseSlug}
                        setPaymentMethod={setPaymentMethod}
                        types={tags || []}
                        disabled={isAlreadyOrder}
                        ref={formRef}
                    />
                    <PaymentOrder
                        handleChange={handlePaymentMethodChange}
                        selectedPayment={paymentMethod}
                        disabled={isAlreadyOrder}
                    />

                    {/* Add class --processing khi bấm đăng ký */}
                    <Button
                        style={{ width: "100%" }}
                        onClick={_onOrder}
                        disabled={isAlreadyOrder}
                        loading={orderLoading}
                        className={`${orderLoading ? "--processing" : ""}`}
                    >
                        <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default CourseOrderPage;
