import React, { useState } from "react";
import ContactTitle from "./ContactTitle";
import ContactSidebar from "./ContactSidebar";
import ContactFormBasic from "./ContactFormBasic";
import ContactFormAdvance from "./ContactFormAdvance";
import ContactForm from "./ContactForm";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/path";
import axios from "axios";
import { subscribesService } from "../../services/subscribesService";
import useMutation from "@/hooks/useMutation";

const ContactPage = () => {
    // const handleFormSubmit = (formData) => {
    //     // call API
    //     console.log("formData", formData);
    //     setTimeout(() => {
    //         // back to home
    //         navigate(PATHS.HOME);
    //         // navigate("/");
    //     }, 1000);
    // };

    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    // const handleFormSubmit = async (formData) => {
    //   setLoading(true);
    //   const payload = {
    //     name: formData?.name || "",
    //     email: formData?.email || "",
    //     phone: formData?.phone || "",
    //     title: formData?.topic || "",
    //     description: formData?.content || "",
    //   };
    //   try {
    //     const res = await subscribesService.subscribes(payload);
    //     if (res.status === 201) {
    //       navigate(PATHS.HOME);
    //     }
    //   } catch (error) {
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const { execute, data, error, loading } = useMutation(subscribesService.subscribes);

    const handleFormSubmit = (formData) => {
        const payload = {
            name: formData?.name || "",
            email: formData?.email || "",
            phone: formData?.phone || "",
            title: formData?.topic || "",
            description: formData?.content || "",
        };
        execute?.(payload, {
            onSuccess: (data) => {
                console.log("data", data);
                navigate(PATHS.HOME);
            },
            onFail: (error) => {
                console.log("error", error);
            },
        });
    };

    return (
        <main className="mainwrapper contact --ptop">
            <div className="container">
                <ContactTitle />
            </div>
            <div className="contact__content">
                <div className="container">
                    <div className="wrapper">
                        <ContactSidebar />

                        {/* <ContactFormBasic handleFormSubmit={handleFormSubmit} /> */}
                        {/* <ContactFormAdvancehandleFormSubmit={handleFormSubmit}/> */}
                        <ContactForm handleFormSubmit={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
