import React, { useEffect, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import Button from "@/components/Button";
import useMutation from "@/hooks/useMutation";
import { courseService } from "@/services/courseService";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import { ROLES } from "@/constants/roles";
import useForm from "@/hooks/useForm";
import { regrexRule, requireRule } from "@/utils/validate";
import { useAuthContext } from "@/context/AuthContext";
import { message } from "antd";
import { orderService } from "@/services/orderService";
import PATHS from "@/constants/path";

const CourseOrderPage = () => {
    const navigate = useNavigate();

    /* -- Lấy data từ useAuthContext -- */
    const { profile, courseInfo, handleGetProfileCourse, handleGetProfilePayment } =
        useAuthContext();

    const {
        firstName: profileName,
        email: profileEmail,
        phone: profilePhone,
    } = profile || {};

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
    /* -- Child props -- */
    const InfoOrderProps = {
        ...courseDetailData,
        teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)) || {},
        price: formatCurrency(price),
    };

    /* -- Xử lý ngăn chặn khoá học đã đăng ký -- */
    const isAlreadyOrder =
        courseInfo?.some((item) => item?.course?.slug === courseSlug) || false;

    /* -- HANDLE profile form -- */
    const { form, register, validate, setForm } = useForm(
        {
            name: "",
            email: "",
            phone: "",
            type: "",
        },
        {
            name: [requireRule("Vui lòng nhập tên")],
            email: [
                requireRule("Vui lòng nhập email"),
                regrexRule("email", "Vui lòng nhập đúng định dạng email"),
            ],
            phone: [
                requireRule("Vui lòng nhập phone"),
                regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
            ],
            type: [requireRule("Vui lòng chọn hình thức học")],
        }
    );

    /* -- Reset form, set initialValue form -- */
    useEffect(() => {
        if (isAlreadyOrder && courseInfo?.length > 0) {
            const orderedCourse = courseInfo?.find(
                (item) => item?.course?.slug === courseSlug
            );
            // console.log("orderedCourse", orderedCourse);
            setForm({
                name: orderedCourse.name || "",
                email: profileEmail || "",
                phone: orderedCourse.phone || "",
                type: orderedCourse.type || "",
            });
            setPaymentMethod(orderedCourse.paymentMethod);
        } else {
            setForm({
                name: profileName || "",
                email: profileEmail || "",
                phone: profilePhone || "",
                type: "",
            });
        }
    }, [profileName, profileEmail, profilePhone, isAlreadyOrder, courseInfo]);

    /* -- HANDLE paymentMethod change -- */
    const [paymentMethod, setPaymentMethod] = useState("");
    const handlePaymentMethodChange = (payment) => {
        setPaymentMethod(payment);
    };
    // console.log("form", form);
    // console.log("paymentMethod", paymentMethod);

    /* -- HANDLE when user click order this course -- */
    const _onOrder = () => {
        const profileError = validate();

        if (Object.keys(profileError).length > 0) {
            console.log("Profile form validate failed", profileError);
        } else {
            if (paymentMethod) {
                // Setup payload
                const payload = {
                    name: form?.name,
                    phone: form?.phone,
                    course: courseDetailData?.id,
                    type: form.type,
                    paymentMethod,
                };
                console.log("payload", payload);
                // Call api order
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
                        register={register}
                        types={tags || []}
                        disabled={isAlreadyOrder}
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
