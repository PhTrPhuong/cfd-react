import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import ContentDetailSection from "./ContentDetailSection";
import FeaturedSection from "./FeaturedSection";
import FaqSection from "../HomePage/FaqSection";
import CoursesSection from "./CoursesSection";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { courseService } from "@/services/courseService";
import { questionService } from "@/services/questionService";
import { ROLES } from "@/constants/roles";
import { formatCurrency, formatDate } from "@/utils/format";
import HeaderTop from "@/components/HeaderTop";
import PageLoading from "@/components/PageLoading";
import useDebounce from "@/hooks/useDebounce";

const CourseDetailPage = () => {
    const params = useParams();
    const { courseSlug } = params;

    /* -- call API lấy data -- */
    const { data: questionsData, loading: questionLoading } = useQuery(
        questionService.getQuestions
    );
    const { data: courseData, loading: courseLoading } = useQuery(
        courseService.getCourses
    );
    const {
        data: courseDetailData,
        loading: courseDetailLoading,
        execute,
    } = useMutation(courseService.getCourseBySlug);

    /* ---- */
    useEffect(() => {
        if (courseSlug) execute?.(courseSlug || "", {});
    }, [courseSlug]);

    /* -- Modify data -- */
    const questions = questionsData?.questions || [];
    const courses = courseData?.courses || [];
    const orderLink = `/course-order/` + courseSlug;

    /* -- Tạo modifiedProps chứa tất cả dữ liệu của courseDetailData & data cần thiết khác -- */
    const { teams, startDate, price } = courseDetailData || {};
    // const modifiedProps = {
    //     ...courseDetailData,
    //     teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
    //     startDate: formatDate(startDate || ""),
    //     price: formatCurrency(price),
    //     orderLink,
    // };

    /* -- sử dụng hook useMemo -- */
    const modifiedProps = useMemo(
        () => ({
            ...courseDetailData,
            teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
            startDate: formatDate(startDate || ""),
            price: formatCurrency(price),
            orderLink,
        }),
        [courseDetailData, teams, ROLES, startDate, price, orderLink]
    );

    /* ---- */
    const apiLoading = courseDetailLoading || questionLoading || courseLoading;
    const pageLoading = useDebounce(apiLoading, 500);
    if (pageLoading) {
        return <PageLoading />;
    }

    return (
        <>
            <HeaderTop {...modifiedProps} />
            <main className="mainwrapper coursedetailpage">
                <HeroSection {...modifiedProps} />
                <ContentDetailSection {...modifiedProps} />
                <FeaturedSection />
                <FaqSection questions={questions} loading={questionLoading} />
                <CoursesSection courses={courses} loading={courseLoading} />
            </main>
        </>
    );
};

export default CourseDetailPage;
