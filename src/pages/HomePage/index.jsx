import React, { useEffect, useState } from "react";
import axios from "axios";
import useQuery from "@/hooks/useQuery";
import { courseService } from "../../services/courseService";
import CallregisterSection from "./CallregisterSection";
import GallerySection from "./GallerySection";
import FaqSection from "./FaqSection";
import TestimonialSection from "./TestimonialSection";
import FeaturedSection from "./FeaturedSection";
import TeacherSection from "./TeacherSection";
import CoursesSection from "./CoursesSection";
import CourseComingSection from "./CourseComingSection";
import HeroSection from "./HeroSection";
import styled from "styled-components";
import { teamService } from "@/services/teamService";
import { questionService } from "@/services/questionService";
import { galleryService } from "@/services/galleryService";

const HomePage = () => {
    // const {
    //     data: courses, error: coursesError, loading: coursesLoading, refetch,
    // } = useQuery(() => axios.get("https://cfdcourses.cfdcircle.vn/api/v1/courses"));
    // console.log("courses", courses);
    // console.log("coursesError", coursesError);
    // console.log("coursesLoading", coursesLoading);

    /* ---- Xử lý data - Courses ---- */
    const {
        data: coursesData,
        error: coursesError,
        loading: coursesLoading,
        refetch,
    } = useQuery(courseService.getCourses);

    const courses = coursesData?.courses || [];
    // -- Modify data - filter những Courses có startDate > toDate -- //
    const comingCourses =
        courses.filter(
            (course) => course.startDate && new Date(course.startDate) > new Date()
        ) || [];

    /* ---- Xử lý data - Teams ---- */
    const { data: teamsData, loading: teamsLoading } = useQuery(teamService.getTeams);
    const teams = teamsData?.teams || [];

    /* ---- Xử lý data - Faq - questions---- */
    const { data: questionsData, loading: questionsLoading } = useQuery(
        questionService.getQuestions
    );
    const questions = questionsData?.questions || [];

    /* ---- Xử lý data - Gallery---- */
    const { data: galleriesData, loading: galleriesLoading } = useQuery(
        galleryService.getGalleries
    );
    const galleries = galleriesData?.galleries?.[0]?.images || [];

    return (
        <main className="mainwrapper">
            <HeroSection />
            <CourseComingSection courses={comingCourses} loading={coursesLoading} />
            <CoursesSection courses={courses} loading={coursesLoading} />
            <TeacherSection teachers={teams} loading={teamsLoading} />
            <FeaturedSection />
            <TestimonialSection />
            <FaqSection questions={questions} loading={questionsLoading} />
            <GallerySection galleries={galleries} loading={galleriesLoading} />
            <CallregisterSection />
        </main>
    );
};

export default HomePage;
