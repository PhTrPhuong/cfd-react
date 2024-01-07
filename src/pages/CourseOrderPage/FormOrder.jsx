import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useForm from "@/hooks/useForm";
import { regrexRule, requireRule } from "@/utils/validate";

const FormOrder = ({ profile, types, disabled, courseInfo, courseSlug }, ref) => {
    /* ---- */
    const typeOptions =
        types?.length > 0
            ? [
                  { value: "", label: "--" },
                  ...types.map((type) => ({ value: type, label: type })),
              ]
            : [{ value: "", label: "--" }];

    /* ---- */
    const {
        firstName: profileName,
        email: profileEmail,
        phone: profilePhone,
    } = profile || {};

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

    /* -- RESET form, set initialValue form -- */
    useEffect(() => {
        if (disabled && courseInfo?.length > 0) {
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
        } else {
            setForm({
                name: profileName || "",
                email: profileEmail || "",
                phone: profilePhone || "",
                type: "",
            });
        }
    }, [profileName, profileEmail, profilePhone, disabled, courseInfo]);

    /* ---- */
    useImperativeHandle(ref, () => {
        return {
            validate,
            form,
        };
    });

    return (
        <div className="itemorder formorder">
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
                <div className="form">
                    <div className="form-container">
                        <Input
                            label="Họ và tên"
                            required
                            placeholder="Họ và tên"
                            disabled={disabled}
                            {...register("name")}
                        />
                        <Input
                            label="Email"
                            required
                            placeholder="Email"
                            disabled
                            {...register("email")}
                        />
                    </div>
                    <div className="form-container">
                        <Input
                            label="Số điện thoại"
                            required
                            placeholder="Số điện thoại"
                            disabled={disabled}
                            {...register("phone")}
                        />
                        <Input
                            label="Hình thức học"
                            required
                            disabled={disabled}
                            renderInput={(inputProps) => {
                                return <Select options={typeOptions} {...inputProps} />;
                            }}
                            {...register("type")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(FormOrder);
